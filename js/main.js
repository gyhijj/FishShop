// Main application logic
let currentPage = 'home';
if (typeof currentUser === 'undefined') {
    var currentUser = null;
}

// Initialize the application
function initializeApp() {
    setupEventListeners();
    
    // Initialize auth on all pages
    if (typeof initAuth === 'function') initAuth();
    
    // Initialize cart on all pages  
    if (typeof initCart === 'function') initCart();
    
    // Initialize search on all pages
    if (typeof initSearch === 'function') initSearch();
    
    // Initialize wishlist
    if (typeof updateWishlistDisplay === 'function') updateWishlistDisplay();
    
    // Load homepage content only if we're on the main page
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        loadHomePage();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.includes('pages/') || href.includes('../') || href.includes('.html')) {
                // Let normal navigation work for actual page links
                return;
            }
            e.preventDefault();
            const page = href.replace('.html', '').replace('../', '').replace('pages/', '') || 'home';
            if (page === 'index') {
                showPage('home');
            } else {
                showPage(page);
            }
        });
    });

    // Hero buttons navigation
    document.querySelectorAll('.hero-actions .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && (href.includes('pages/') || href.includes('.html'))) {
                // Let normal navigation work
                return;
            }
        });
    });

    // Profile dropdown
    const profileBtn = document.getElementById('profile-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (profileBtn && dropdownMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Cart button
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', showCartModal);
    }

    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideAllModals();
        }
    });

    // Close modals with close buttons
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', hideAllModals);
    });

    // Category links in footer and cards
    document.querySelectorAll('[onclick*="showCategoryProducts"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = link.getAttribute('onclick').match(/\d+/)[0];
            // Navigate to catalog page
            window.location.href = 'pages/catalog.html?category=' + categoryId;
        });
    });

    // Category cards click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.category-card')) {
            const categoryCard = e.target.closest('.category-card');
            const categoryId = categoryCard.getAttribute('data-category-id');
            if (categoryId) {
                window.location.href = 'pages/catalog.html?category=' + categoryId;
            }
        }
    });

    // Setup event listeners for wishlist buttons dynamically
    document.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.target.closest('.wishlist-btn');
            const productId = parseInt(btn.dataset.productId || btn.getAttribute('onclick')?.match(/\d+/)?.[0]);
            if (productId) {
                toggleWishlist(productId);
            }
        }
    });
}

// Show specific page
function showPage(pageName) {
    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[href*="${pageName}"]`) || 
                      document.querySelector(`.nav-link[href="index.html"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Update current page
    currentPage = pageName;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Load page specific content
    switch(pageName) {
        case 'home':
            loadHomePage();
            break;
        case 'catalog':
            loadCatalogPage();
            break;
        case 'about':
            // About page is static
            break;
        case 'contact':
            // Contact page is static
            break;
        case 'profile':
            loadProfilePage();
            break;
    }

    // Update URL without page reload
    updateHistory(pageName);
}

// Load home page content
function loadHomePage() {
    loadCategories();
    loadFeaturedProducts();
}

// Load categories
function loadCategories() {
    const categoriesContainer = document.getElementById('categories-grid');
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.setAttribute('data-category-id', category.id);
        categoryCard.style.cursor = 'pointer';
        
        categoryCard.innerHTML = `
            <i class="${category.icon}"></i>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
        `;
        
        categoriesContainer.appendChild(categoryCard);
    });
}

// Load featured products
async function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products-grid');
    if (!featuredContainer) return;

    try {
        // Загружаем товары через API
        const response = await fetch('/api/products');
        const products = await response.json();
        
        if (!Array.isArray(products)) {
            console.log('Товары еще загружаются...');
            return;
        }

        // Get 9 random products as featured
        const featuredProducts = products
            .sort(() => 0.5 - Math.random())
            .slice(0, 9);
        
        featuredContainer.innerHTML = '';
        
        featuredProducts.forEach(product => {
            const productCard = createProductCard(product);
            featuredContainer.appendChild(productCard);
        });

        // Update wishlist display after creating cards
        await updateWishlistDisplay();
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        featuredContainer.innerHTML = '<p>Загрузка товаров...</p>';
    }
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProduct(product.id);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            <button class="wishlist-btn" data-product-id="${product.id}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.categoryId)}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>

            <div class="product-price">
                <span class="price">${formatPrice(product.price)}</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> В корзину
                </button>
                <button class="quick-view-btn" onclick="event.stopPropagation(); showProduct(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Format price
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
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

// Get category name by ID
function getCategoryName(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Неизвестная категория';
}

// Show product modal
async function showProduct(productId) {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            showNotification('Товар не найден', 'error');
            return;
        }
        
        const modal = document.getElementById('product-modal');
        const title = document.getElementById('product-modal-title');
        const body = document.getElementById('product-modal-body');
        
        if (!modal || !title || !body) return;
        
        title.textContent = product.name;
        
        const oldPriceHTML = product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : '';
        const isNew = product.isNew ? '<span class="product-badge new">Новинка</span>' : '';
        const isSale = product.isSale ? '<span class="product-badge sale">Скидка</span>' : '';
        
        body.innerHTML = `
            <div class="product-modal-content">
                <div class="product-modal-image">
                    <img src="${product.images[0]}" alt="${product.name}" id="main-product-image">
                    ${isNew}
                    ${isSale}
                    <div class="product-thumbnails">
                        ${product.images.map((img, index) => 
                            `<img src="${img}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                                 onclick="changeMainImage('${img}', this)">`
                        ).join('')}
                    </div>
                </div>
                <div class="product-modal-info">
                    
                    <div class="product-price">
                        <span class="price">${formatPrice(product.price)}</span>
                        ${oldPriceHTML}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                            В корзину
                        </button>
                        <button class="btn btn-secondary wishlist-btn" id="modal-wishlist-btn-${product.id}"
                                data-product-id="${product.id}">
                            <i class="fas fa-heart"></i>
                            <span id="wishlist-text-${product.id}">В избранное</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Update wishlist button state after modal is shown
        const wishlist = await getWishlist();
        const isInWishlist = wishlist.includes(product.id);
        const wishlistBtn = document.getElementById(`modal-wishlist-btn-${product.id}`);
        const wishlistText = document.getElementById(`wishlist-text-${product.id}`);
        
        if (wishlistBtn && wishlistText) {
            if (isInWishlist) {
                wishlistBtn.classList.add('active');
                wishlistText.textContent = 'В избранном';
            } else {
                wishlistBtn.classList.remove('active');
                wishlistText.textContent = 'В избранное';
            }
        }
        
    } catch (error) {
        console.error('Ошибка загрузки товара:', error);
        showNotification('Ошибка загрузки товара', 'error');
    }
}

// Change main image in product modal
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Toggle wishlist - database version
async function toggleWishlist(productId) {
    // Check authentication
    const user = getCurrentUser();
    if (!user) {
        showNotification('Войдите в аккаунт, чтобы добавить товар в избранное', 'warning');
        return;
    }
    
    // Load product from API
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
        await updateWishlistDisplay();
        
    } catch (error) {
        console.error('Ошибка при работе с избранным:', error);
        showNotification('Ошибка при обновлении избранного', 'error');
    }
}

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

// Update wishlist display
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
        
        // Update modal wishlist button text if it exists
        const wishlistText = document.getElementById(`wishlist-text-${productId}`);
        if (wishlistText) {
            wishlistText.textContent = isInWishlist ? 'В избранном' : 'В избранное';
        }
    });
}

// Get cart from localStorage
function getCart() {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : [];
}

// Handle search
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `pages/catalog.html?search=${encodeURIComponent(query)}`;
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update browser history
function updateHistory(page) {
    const url = page === 'home' ? '/' : `/${page}`;
    history.replaceState({page}, '', url);
}

// Notification queue
let notificationQueue = [];
let currentNotifications = [];


// Show notification
function showNotification(message, type = 'info') {
      const notification = {
        message,
        type,
        id: Date.now() + Math.random()
    };
    
    notificationQueue.push(notification);
    processNotificationQueue();
}
// Process notification queue
function processNotificationQueue() {
    // If there are already 3 notifications, wait
    if (currentNotifications.length >= 3) {
        return;
    }
    
    // If no notifications in queue, return
    if (notificationQueue.length === 0) {
        return;
    }
    
    const notification = notificationQueue.shift();
    showSingleNotification(notification);
}
// Show single notification
function showSingleNotification(notificationData) {
    const notification = document.createElement('div');
    notification.className = `notification ${notificationData.type}`;
    notification.setAttribute('data-id', notificationData.id);
    notification.innerHTML = `
         <i class="${getNotificationIcon(notificationData.type)}"></i>
        ${notificationData.message}
    `;

     // Calculate position based on existing notifications
    const topPosition = 20 + (currentNotifications.length * 80);
    notification.style.top = `${topPosition}px`;
    
    document.body.appendChild(notification);
    currentNotifications.push(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
         removeNotification(notification);
    }, 3000);
}


// Remove notification and update positions
function removeNotification(notification) {
    if (!notification.parentNode) return;
    
    // Remove from current notifications array
    const index = currentNotifications.indexOf(notification);
    if (index > -1) {
        currentNotifications.splice(index, 1);
    }
    
    // Add fade out animation
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
        
        // Update positions of remaining notifications
        updateNotificationPositions();
        
        // Process next notification in queue
        processNotificationQueue();
    }, 300);
}
// Update positions of existing notifications
function updateNotificationPositions() {
    currentNotifications.forEach((notification, index) => {
        const newTopPosition = 20 + (index * 80);
        notification.style.top = `${newTopPosition}px`;
    });
}
// Update positions of existing notifications
function updateNotificationPositions() {
    currentNotifications.forEach((notification, index) => {
        const newTopPosition = 20 + (index * 80);
        notification.style.top = `${newTopPosition}px`;
    });
    }

// Get notification icon
function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        default: return 'fas fa-info-circle';
    }
}

// Hide all modals
function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
        modal.style.display = 'none';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
