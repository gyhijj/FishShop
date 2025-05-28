// Catalog functionality
let currentCategoryFilter = '';
let currentSortFilter = '';
let currentPageNum = 1;
let productsPerPage = 12;
let filteredProducts = [];

// Load catalog page
function loadCatalogPage() {
    populateCategoryFilters();
    setupCatalogEventListeners();
    
    // If there's an active search, show search results
    if (currentSearchQuery) {
        displaySearchResults();
    } else {
        filterProducts();
    }
}

// Populate category filters
function populateCategoryFilters() {
    const categoryFilter = document.getElementById('category-filter');
    if (!categoryFilter) return;
    
    // Clear existing options except "Все категории"
    categoryFilter.innerHTML = '<option value="">Все категории</option>';
    
    // Add category options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });
}

// Setup catalog event listeners
function setupCatalogEventListeners() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentCategoryFilter = e.target.value;
            currentPageNum = 1;
            filterProducts();
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            currentSortFilter = e.target.value;
            currentPageNum = 1;
            filterProducts();
        });
    }
}

// Show products by category
function showCategoryProducts(categoryId) {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.value = categoryId;
        currentCategoryFilter = categoryId.toString();
        currentPageNum = 1;
        filterProducts();
    }
}

// Filter products
function filterProducts() {
    // If there's a search query, use search results instead
    if (currentSearchQuery) {
        displaySearchResults();
        return;
    }
    
    let filtered = [...products];
    
    // Filter by category
    if (currentCategoryFilter) {
        filtered = filtered.filter(product => 
            product.categoryId === parseInt(currentCategoryFilter)
        );
    }
    
    // Sort products
    if (currentSortFilter) {
        switch(currentSortFilter) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }
    
    filteredProducts = filtered;
    displayProducts();
}

// Display products with pagination
function displayProducts() {
    const productsGrid = document.getElementById('catalog-products-grid');
    const searchResultsInfo = document.getElementById('search-results-info');
    
    if (!productsGrid) return;
    
    // Hide search results info
    if (searchResultsInfo && !currentSearchQuery) {
        searchResultsInfo.style.display = 'none';
    }
    
    // Calculate pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPageNum - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Clear products grid
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>Товары не найдены</h3>
                <p>В выбранной категории пока нет товаров</p>
                <button class="btn btn-primary" onclick="clearFilters()">
                    Показать все товары
                </button>
            </div>
        `;
        
        // Hide pagination
        const pagination = document.getElementById('pagination');
        if (pagination) {
            pagination.style.display = 'none';
        }
        return;
    }
    
    // Display products
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Display pagination
    displayPagination(totalPages);
}

// Display pagination
function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (!pagination || totalPages <= 1) {
        if (pagination) pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    pagination.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.disabled = currentPageNum === 1;
    prevBtn.onclick = () => changePage(currentPageNum - 1);
    pagination.appendChild(prevBtn);
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPageNum - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page and ellipsis
    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.textContent = '1';
        firstBtn.onclick = () => changePage(1);
        pagination.appendChild(firstBtn);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'page-ellipsis';
            pagination.appendChild(ellipsis);
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = i === currentPageNum ? 'active' : '';
        pageBtn.onclick = () => changePage(i);
        pagination.appendChild(pageBtn);
    }
    
    // Last page and ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'page-ellipsis';
            pagination.appendChild(ellipsis);
        }
        
        const lastBtn = document.createElement('button');
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => changePage(totalPages);
        pagination.appendChild(lastBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.disabled = currentPageNum === totalPages;
    nextBtn.onclick = () => changePage(currentPageNum + 1);
    pagination.appendChild(nextBtn);
    
    // Page info
    const pageInfo = document.createElement('div');
    pageInfo.className = 'page-info';
    const startItem = (currentPageNum - 1) * productsPerPage + 1;
    const endItem = Math.min(currentPageNum * productsPerPage, filteredProducts.length);
    pageInfo.textContent = `${startItem}-${endItem} из ${filteredProducts.length}`;
    pagination.appendChild(pageInfo);
}

// Change page
function changePage(pageNum) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (pageNum >= 1 && pageNum <= totalPages) {
        currentPageNum = pageNum;
        displayProducts();
        
        // Scroll to top of products
        const productsGrid = document.getElementById('catalog-products-grid');
        if (productsGrid) {
            productsGrid.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Clear all filters
function clearFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) categoryFilter.value = '';
    if (sortFilter) sortFilter.value = '';
    
    currentCategoryFilter = '';
    currentSortFilter = '';
    currentPageNum = 1;
    
    clearSearch();
    filterProducts();
}

// Show product modal
function showProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('product-modal-title');
    const modalBody = document.getElementById('product-modal-body');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    modalTitle.textContent = product.name;
    
    modalBody.innerHTML = `
        <div class="product-modal-body">
            <div class="product-modal-images">
                <div class="product-main-image">
                    <img id="main-product-image" src="${product.images[0]}" alt="${product.name}">
                </div>
                ${product.images.length > 1 ? `
                    <div class="product-thumbnails">
                        ${product.images.map((img, index) => `
                            <div class="product-thumbnail ${index === 0 ? 'active' : ''}" 
                                 onclick="changeMainImage('${img}', this)">
                                <img src="${img}" alt="${product.name}">
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="product-modal-info">
                <div class="product-modal-category">${getCategoryName(product.categoryId)}</div>
                <h2 class="product-modal-title">${product.name}</h2>

                <div class="product-modal-price">${formatPrice(product.price)}</div>
                <div class="product-modal-description">
                    <p>${product.description}</p>
                </div>
                ${product.characteristics ? `
                    <div class="product-characteristics">
                        <h4>Характеристики</h4>
                        <ul class="characteristics-list">
                            ${Object.entries(product.characteristics).map(([key, value]) => `
                                <li>
                                    <span class="label">${key}:</span>
                                    <span class="value">${value}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="product-modal-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); hideProductModal();">
                        <i class="fas fa-shopping-cart"></i> В корзину
                    </button>
                    <button class="btn btn-secondary" onclick="toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i> В избранное
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
}

// Hide product modal
function hideProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

// Change main image in product modal
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.product-thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Initialize catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup product modal close
    const productModalClose = document.getElementById('product-modal-close');
    if (productModalClose) {
        productModalClose.addEventListener('click', hideProductModal);
    }
});