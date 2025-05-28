// Profile functionality with working buttons - localStorage для избранного и заказов
// Get wishlist from localStorage
function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
}
// Setup product card listeners
function setupProductCardListeners() {
    // Add event listeners to wishlist buttons in product cards
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId || btn.getAttribute('onclick')?.match(/\d+/)?.[0]);
            if (productId) {
                toggleWishlist(productId);
            }
        });
    });
}
// Toggle wishlist - localStorage version
function toggleWishlist(productId) {
    if (!requireAuth(() => toggleWishlist(productId), 'Войдите в аккаунт, чтобы добавить товар в избранное')) {
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        // Add to wishlist
        wishlist.push(productId);
        showNotification(`${product.name} добавлен в избранное`, 'success');
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showNotification(`${product.name} удален из избранного`, 'info');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
}
// Update wishlist display - localStorage version
function updateWishlistDisplay() {
    const wishlist = getWishlist();
    
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
// Update wishlist page - localStorage version
function updateWishlistPage() {
    const wishlistContainer = document.getElementById('wishlist-products-grid');
    if (!wishlistContainer) return;
    
    const wishlist = getWishlist();
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
// Update order history - localStorage
async function updateOrderHistory() {
    const user = getCurrentUser();
    const ordersContainer = document.getElementById('orders-container');
    if (!ordersContainer) return;
    
    if (!user) {
        ordersContainer.innerHTML = '<p>Войдите в аккаунт, чтобы увидеть заказы</p>';
        return;
    }
    
    try {
        // Получаем заказы из localStorage
        const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orders = allOrders.filter(order => order.userId === user.id);
        
        console.log('📋 История заказов загружена из localStorage:', orders);
        
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
        
    } catch (error) {
        console.error('❌ Ошибка загрузки заказов:', error);
        ordersContainer.innerHTML = '<p>Ошибка загрузки заказов</p>';
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
            <p style="margin: 5px 0; color: #666;"><strong>Сумма:</strong> ${(order.total_price || order.totalPrice || 0).toLocaleString('ru-RU')} ₽</p>
            <p style="margin: 5px 0; color: #666;"><strong>Товаров:</strong> ${order.items.length}</p>
        </div>
        <div class="order-items" style="margin-bottom: 15px;">
            ${order.items.slice(0, 3).map(item => `
                <span style="display: inline-block; background: #e9ecef; padding: 4px 8px; border-radius: 4px; margin: 2px; font-size: 12px;">
                    ${item.name} × ${item.quantity}
                </span>
            `).join('')}
            ${order.items.length > 3 ? `<span style="color: #666; font-size: 12px;">и еще ${order.items.length - 3}...</span>` : ''}
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
        console.error('Ошибка обновления профиля через API:', error);
    }
    
    // Fallback: обновляем локально
    user.firstName = firstName;
    user.first_name = firstName;
    user.lastName = lastName;  
    user.last_name = lastName;
    user.email = email;
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateAuthDisplay();
    showNotification('Профиль обновлен локально', 'success');
}
function viewOrderDetails(orderId) {
    showNotification(`Детали заказа #${orderId}`, 'info');
    // Здесь можно добавить модальное окно с деталями заказа
}
console.log('📋 Профиль с localStorage для заказов загружен');