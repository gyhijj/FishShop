// Search functionality
let searchResults = [];
let currentSearchQuery = '';

// Handle search input
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const query = searchInput.value.trim().toLowerCase();
    currentSearchQuery = query;
    
    if (query === '') {
        clearSearch();
        return;
    }
    
    // Perform search
    searchResults = products.filter(product => {
        return product.name.toLowerCase().includes(query) ||
               product.description.toLowerCase().includes(query) ||
               getCategoryName(product.categoryId).toLowerCase().includes(query) ||
               (product.characteristics && 
                Object.values(product.characteristics).some(value => 
                    value.toString().toLowerCase().includes(query)
                ));
    });
    
    // Navigate to catalog page with search
    if (window.location.pathname.includes('catalog.html')) {
        displaySearchResults();
    } else {
        // Check if we're on main page or in pages folder
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const catalogUrl = isInPagesFolder ? 'catalog.html' : 'pages/catalog.html';
        window.location.href = catalogUrl + '?search=' + encodeURIComponent(query);
    }
}

// Display search results
function displaySearchResults() {
    const productsGrid = document.getElementById('catalog-products-grid');
    const searchResultsInfo = document.getElementById('search-results-info');
    
    if (!productsGrid) return;
    
    // Show search results info
    if (searchResultsInfo && currentSearchQuery) {
        searchResultsInfo.style.display = 'block';
        updateSearchResults(searchResults.length);
    }
    
    // Clear products grid
    productsGrid.innerHTML = '';
    
    if (searchResults.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Ничего не найдено</h3>
                <p>По запросу "${currentSearchQuery}" товары не найдены</p>
                <button class="btn btn-primary" onclick="clearSearch()">
                    Показать все товары
                </button>
            </div>
        `;
        return;
    }
    
    // Display search results
    searchResults.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Hide pagination for search results
    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.style.display = 'none';
    }
}

// Clear search
function clearSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResultsInfo = document.getElementById('search-results-info');
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (searchResultsInfo) {
        searchResultsInfo.style.display = 'none';
    }
    
    currentSearchQuery = '';
    searchResults = [];
    
    // Reload catalog if we're on catalog page
    if (currentPage === 'catalog') {
        loadCatalogPage();
    }
}

// Update search results info
function updateSearchResults(count) {
    const searchResultsInfo = document.getElementById('search-results-info');
    if (!searchResultsInfo) return;
    
    const plural = count === 1 ? 'товар' : (count < 5 ? 'товара' : 'товаров');
    
    searchResultsInfo.innerHTML = `
        Найдено ${count} ${plural} по запросу "<strong>${currentSearchQuery}</strong>"
        <span class="clear-search" onclick="clearSearch()">Очистить поиск</span>
    `;
}

// Search initialization
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        // Add search icon click handler
        const searchIcon = searchInput.nextElementSibling;
        if (searchIcon && searchIcon.classList.contains('fa-search')) {
            searchIcon.addEventListener('click', handleSearch);
        }
        
        // Add enter key handler
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Add input event with debounce
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);