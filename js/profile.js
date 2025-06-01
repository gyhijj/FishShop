// Profile functionality with working buttons - БД для избранного и заказов

// Get wishlist - database version
async function getWishlist() {
    const user = getCurrentUser();
    if (!user) return [];
    
    try {
        const response = await fetch(`/api/wishlist/${user.id}`);
        if (response.ok) {
            const data = await response.json();
            return data.map(item => item.productId);
        }
        return [];
    } catch (error) {
        console.error('Ошибка получения избранного:', error);
        return [];
    }
}

// Toggle wishlist - database version
async function toggleWishlist(productId) {
    // Проверяем авторизацию
    const user = getCurrentUser();
    if (!user) {
        showNotification('Войдите в аккаунт, чтобы добавить товар в избранное', 'warning');
        return;
    }
    
    // Загружаем товары из API
    let product = null;
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        product = products.find(p => p.id === productId);
        if (!product) {
            showNotification('Товар не найден', 'error');
            return;
        }
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        showNotification('Ошибка загрузки данных о товаре', 'error');
        return;
    }
    
    try {
        const wishlist = await getWishlist();
        const isInWishlist = wishlist.includes(productId);
        
        if (!isInWishlist) {
            // Add to wishlist
            const response = await fetch(`/api/wishlist/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            });
            
            if (response.ok) {
                showNotification(`${product.name} добавлен в избранное`, 'success');
            } else {
                const errorData = await response.text();
                console.error('Ошибка добавления в избранное:', response.status, errorData);
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
        } else {
            // Remove from wishlist
            const response = await fetch(`/api/wishlist/${user.id}/${productId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showNotification(`${product.name} удален из избранного`, 'info');
            } else {
                const errorData = await response.text();
                console.error('Ошибка удаления из избранного:', response.status, errorData);
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
        }
        
        // Update display
        updateWishlistDisplay();
        
    } catch (error) {
        console.error('Ошибка при работе с избранным:', error);
        showNotification('Ошибка при обновлении избранного', 'error');
    }
}

// Update wishlist display - database version
async function updateWishlistDisplay() {
    const wishlist = await getWishlist();
    
    // Update wishlist buttons in product cards
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId || btn.getAttribute('onclick')?.match(/\d+/)?.[0]);
        const isInWishlist = wishlist.includes(productId);
        
        if (isInWishlist) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update wishlist page if it exists
    if (document.querySelector('.profile-section.active') && document.getElementById('wishlist-products-grid')) {
        updateWishlistPage();
    }
}

// Update wishlist page - database version
async function updateWishlistPage() {
    const wishlistContainer = document.getElementById('wishlist-products-grid');
    if (!wishlistContainer) return;
    
    try {
        const wishlist = await getWishlist();
        
        // Load products from API
        const response = await fetch('/api/products');
        const products = await response.json();
        
        const wishlistProducts = products.filter(p => wishlist.includes(p.id));
        
        if (wishlistProducts.length === 0) {
            wishlistContainer.innerHTML = `
                <div class="empty-state" style="text-align: center; padding: 40px;">
                    <i class="fas fa-heart" style="font-size: 60px; color: #ddd; margin-bottom: 20px;"></i>
                    <h3>В избранном пока нет товаров</h3>
                    <p>Добавляйте понравившиеся товары в избранное</p>
                    <button class="btn btn-primary" onclick="window.location.href='catalog.html'">Перейти в каталог</button>
                </div>
            `;
            return;
        }
        
        wishlistContainer.innerHTML = '';
        wishlistProducts.forEach(product => {
            const productCard = createProductCard(product);
            wishlistContainer.appendChild(productCard);
        });
        // Add event listeners to new product cards
        setupProductCardListeners();
        
    } catch (error) {
        console.error('Ошибка загрузки избранного:', error);
        wishlistContainer.innerHTML = '<p>Ошибка загрузки избранного. Попробуйте позже.</p>';
    }
}

// Create product card for wishlist
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isNew = product.isNew ? '<span class="product-badge new">Новинка</span>' : '';
    const isSale = product.isSale ? '<span class="product-badge sale">Скидка</span>' : '';
    const oldPriceHTML = product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)} ₽</span>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            ${isNew}
            ${isSale}
            <button class="wishlist-btn active" data-product-id="${product.id}" title="Удалить из избранного">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <h4>${product.name}</h4>
           
            <div class="product-price">
                <span class="price">${formatPrice(product.price)} ₽</span>
                ${oldPriceHTML}
            </div>
            <div class="product-actions">
                <button class="btn btn-primary add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    В корзину
                </button>
                <button class="btn btn-secondary" onclick="showProduct(${product.id})">
                    Подробнее
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Generate stars for rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Format price function
function formatPrice(price) {
    return price.toLocaleString('ru-RU');
}

// Setup product card listeners
function setupProductCardListeners() {
    // Обработчики для кнопок избранного в карточках товаров
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            if (productId) {
                toggleWishlist(productId);
            }
        });
    });
}

// Load profile page - работает с существующим HTML
function loadProfilePage() {
    if (!isAuthenticated()) {
        window.location.href = '../index.html';
        return;
    }
    
    setupProfileEventListeners();
    showProfileSection('info');
    updateProfileInfo();
    updateWishlistPage();
    updateOrderHistory();
}

// Update profile info
function updateProfileInfo() {
    const user = getCurrentUser();
    if (!user) return;
    
    const firstNameInput = document.getElementById('profile-firstName');
    const lastNameInput = document.getElementById('profile-lastName'); 
    const emailInput = document.getElementById('profile-email');
    
    // Поддерживаем разные форматы имен из API
    const firstName = user.firstName || user.first_name || '';
    const lastName = user.lastName || user.last_name || '';
    const email = user.email || '';
    
    if (firstNameInput) firstNameInput.value = firstName;
    if (lastNameInput) lastNameInput.value = lastName;
    if (emailInput) emailInput.value = email;
    
    console.log('Профиль обновлен:', { firstName, lastName, email });
}

// Update order history - PostgreSQL database
async function updateOrderHistory() {
    const user = getCurrentUser();
    const ordersContainer = document.getElementById('orders-container');
    if (!ordersContainer) return;
    
    if (!user) {
        ordersContainer.innerHTML = '<p>Войдите в аккаунт, чтобы увидеть заказы</p>';
        return;
    }
    
    try {
        // Получаем заказы из базы данных
        const response = await fetch(`/api/orders/${user.id}`);
        
        if (response.ok) {
            const orders = await response.json();
            console.log('📋 История заказов загружена из базы данных:', orders);
            
            if (orders.length === 0) {
                ordersContainer.innerHTML = `
                    <div class="empty-state" style="text-align: center; padding: 40px;">
                        <i class="fas fa-receipt" style="font-size: 60px; color: #ddd; margin-bottom: 20px;"></i>
                        <h3>У вас пока нет заказов</h3>
                        <p>Оформите первый заказ, чтобы он появился здесь</p>
                        <button class="btn btn-primary" onclick="window.location.href='catalog.html'">Перейти в каталог</button>
                    </div>
                `;
                return;
            }
            
            ordersContainer.innerHTML = '';
            orders.forEach(order => {
                const orderCard = createOrderCard(order);
                ordersContainer.appendChild(orderCard);
            });
        } else {
            throw new Error('Ошибка сервера');
        }
        
    } catch (error) {
        console.error('❌ Ошибка загрузки заказов:', error);
        ordersContainer.innerHTML = '<p>Ошибка загрузки заказов. Попробуйте позже.</p>';
    }
}

// Create order card
function createOrderCard(order) {
    const orderDate = new Date(order.created_at).toLocaleDateString('ru-RU');
    const orderTime = new Date(order.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    
    const card = document.createElement('div');
    card.className = 'order-card';
    card.style.cssText = 'background: #f8f9fa; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 15px;';
    
    const statusClass = order.status === 'delivered' ? 'success' : 
                       order.status === 'cancelled' ? 'error' : 'warning';
    
    card.innerHTML = `
        <div class="order-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h4 style="margin: 0; color: #333;">Заказ #${order.id}</h4>
            <span class="order-status ${statusClass}" style="padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                ${getOrderStatusText(order.status)}
            </span>
        </div>
        <div class="order-info" style="margin-bottom: 15px;">
            <p style="margin: 5px 0; color: #666;"><strong>Дата:</strong> ${orderDate} в ${orderTime}</p>
            <p style="margin: 5px 0; color: #666;"><strong>Сумма:</strong> ${parseFloat(order.total).toLocaleString('ru-RU')} ₽</p>
            <p style="margin: 5px 0; color: #666;"><strong>Товаров:</strong> ${Array.isArray(order.items) ? order.items.length : 0}</p>
        </div>
        <div class="order-items" style="margin-bottom: 15px;">
            ${Array.isArray(order.items) ? order.items.slice(0, 3).map(item => `
                <span style="display: inline-block; background: #e9ecef; padding: 4px 8px; border-radius: 4px; margin: 2px; font-size: 12px;">
                    Товар #${item.productId || item.id || 'N/A'} × ${item.quantity || 1}
                </span>
            `).join('') : '<span style="color: #666;">Нет данных о товарах</span>'}
            ${Array.isArray(order.items) && order.items.length > 3 ? `<span style="color: #666; font-size: 12px;">и еще ${order.items.length - 3}...</span>` : ''}
        </div>
        <div class="order-actions">
            <button class="btn btn-secondary" onclick="viewOrderDetails(${order.id})" style="padding: 8px 16px; border: 1px solid #ddd; background: #fff; border-radius: 4px; cursor: pointer;">
                Подробнее
            </button>
        </div>
    `;
    
    return card;
}

// Get order status text
function getOrderStatusText(status) {
    switch(status) {
        case 'processing': return 'В обработке';
        case 'confirmed': return 'Подтвержден';
        case 'shipped': return 'Отправлен';
        case 'delivered': return 'Доставлен';
        case 'completed': return 'Выполнен';
        case 'cancelled': return 'Отменен';
        default: return 'В обработке';
    }
}

// Setup profile event listeners
function setupProfileEventListeners() {
    // Profile navigation - работаем с существующими ссылками
    document.querySelectorAll('.profile-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').replace('#', '');
            showProfileSection(section);
        });
    });
    
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileForm);
    }
}

// Show profile section - работает с HTML структурой
function showProfileSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Обновляем навигацию - работаем с ссылками из HTML
    document.querySelectorAll('.profile-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Активируем нужную ссылку
    const activeLink = document.querySelector(`.profile-nav a[href="#${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Показываем соответствующую секцию
    document.querySelectorAll('.profile-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Ищем секцию по ID из HTML
    const targetSection = document.getElementById(`profile-${sectionName}`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }
    
    // Загружаем данные для секции
    if (sectionName === 'wishlist') {
        console.log('Loading wishlist...');
        updateWishlistPage();
        updateWishlistDisplay();
    } else if (sectionName === 'orders') {
        console.log('Loading orders...');
        updateOrderHistory();
    }
}

// Handle profile form submission
async function handleProfileForm(e) {
    e.preventDefault();
    
    const user = getCurrentUser();
    if (!user) return;
    
    const firstName = document.getElementById('profile-firstName').value;
    const lastName = document.getElementById('profile-lastName').value;
    const email = document.getElementById('profile-email').value;
    
    try {
        // Пробуем обновить через API
        const response = await fetch(`/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email })
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                // Обновляем локальные данные
                user.firstName = firstName;
                user.first_name = firstName;
                user.lastName = lastName;
                user.last_name = lastName;
                user.email = email;
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                updateAuthDisplay();
                showNotification('Профиль успешно обновлен', 'success');
                return;
            }
        }
    } catch (error) {
        console.log('API недоступен, сохраняем локально');
    }
    
    // Резервное сохранение в localStorage
    user.firstName = firstName;
    user.first_name = firstName;
    user.lastName = lastName;
    user.last_name = lastName;
    user.email = email;
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateAuthDisplay();
    showNotification('Профиль обновлен', 'success');
}

// View order details
function viewOrderDetails(orderId) {
    showNotification(`Детали заказа #${orderId} будут доступны в будущих обновлениях`, 'info');
}

// Initialize profile functionality
document.addEventListener('DOMContentLoaded', async function() {
    // Update wishlist display asynchronously
    await updateWishlistDisplay();
    
    // Если мы на странице профиля, инициализируем её
    if (window.location.pathname.includes('profile.html')) {
        loadProfilePage();
    }
});
