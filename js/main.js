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
    
    const isInWishlist = getWishlist().includes(product.id);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                    onclick="event.stopPropagation(); toggleWishlist(${product.id})">
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
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(price);
}

// Get category name by ID
function getCategoryName(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Неизвестная категория';
}

// Get wishlist from localStorage
function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

// Get cart from localStorage
function getCart() {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : [];
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

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="${getNotificationIcon(type)}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
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