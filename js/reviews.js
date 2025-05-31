// Reviews - полная система отзывов с обязательной авторизацией и двухуровневым выбором
let currentReviewType = '';
let selectedProductId = null;
let currentRating = 0;
let allReviews = [];
let filteredReviews = [];
// Инициализация страницы отзывов
function initReviews() {
    setupReviewTypeSelection();
    setupStarRating();
    setupReviewForm();
    setupFilters();
    setupAuthNotice();
    updateReviewFormDisplay();
    loadProducts();
    loadReviews();
    
    console.log('🌟 Система отзывов инициализирована');
}
// Настройка выбора типа отзыва
function setupReviewTypeSelection() {
    const storeBtn = document.getElementById('store-review-btn');
    const productBtn = document.getElementById('product-review-btn');
    const productSelector = document.getElementById('product-selector');
    const formContainer = document.getElementById('review-form-container');
    const formTitle = document.getElementById('form-title');
    
    if (storeBtn) {
        storeBtn.addEventListener('click', () => {
            selectReviewType('store');
            storeBtn.classList.add('active');
            productBtn.classList.remove('active');
            productSelector.classList.remove('show');
            formContainer.classList.add('show');
            formTitle.textContent = 'Оставить отзыв о магазине';
            selectedProductId = null;
        });
    }
    
    if (productBtn) {
        productBtn.addEventListener('click', () => {
            selectReviewType('product');
            productBtn.classList.add('active');
            storeBtn.classList.remove('active');
            productSelector.classList.add('show');
            formTitle.textContent = 'Оставить отзыв о товаре';
            
            // Сбрасываем селекторы
            const categorySelect = document.getElementById('category-select');
            const productSelect = document.getElementById('product-select');
            const productSelectGroup = document.getElementById('product-select-group');
            
            if (categorySelect) categorySelect.value = '';
            if (productSelect) productSelect.innerHTML = '<option value="">-- Выберите товар --</option>';
            if (productSelectGroup) productSelectGroup.style.display = 'none';
            
            selectedProductId = null;
            formContainer.classList.remove('show');
        });
    }
    
    // Обработчик выбора категории
    const categorySelect = document.getElementById('category-select');
    const productSelectGroup = document.getElementById('product-select-group');
    const productSelect = document.getElementById('product-select');
    
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            const categoryId = e.target.value ? parseInt(e.target.value) : null;
            
            if (categoryId) {
                // Показываем селектор товаров и загружаем товары выбранной категории
                productSelectGroup.style.display = 'block';
                loadProductsByCategory(categoryId);
            } else {
                // Скрываем селектор товаров
                productSelectGroup.style.display = 'none';
                productSelect.innerHTML = '<option value="">-- Выберите товар --</option>';
                selectedProductId = null;
                if (currentReviewType === 'product') {
                    formContainer.classList.remove('show');
                }
            }
        });
    }
    
    // Обработчик выбора товара
    if (productSelect) {
        productSelect.addEventListener('change', (e) => {
            selectedProductId = e.target.value ? parseInt(e.target.value) : null;
            if (currentReviewType === 'product') {
                if (selectedProductId) {
                    formContainer.classList.add('show');
                } else {
                    formContainer.classList.remove('show');
                }
            }
        });
    }
}
// Выбор типа отзыва
function selectReviewType(type) {
    currentReviewType = type;
    console.log('Выбран тип отзыва:', type);
}
// Настройка звездного рейтинга
function setupStarRating() {
    const stars = document.querySelectorAll('#star-rating .star');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
        });
        
        star.addEventListener('mouseleave', () => {
            highlightStars(currentRating);
        });
        
        star.addEventListener('click', () => {
            setRating(index + 1);
        });
    });
}
// Подсветка звезд
function highlightStars(rating) {
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}
// Установка рейтинга
function setRating(rating) {
    currentRating = rating;
    highlightStars(rating);
    console.log('Установлен рейтинг:', rating);
}
// Настройка уведомления об авторизации
function setupAuthNotice() {
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-option').click();
        });
    }
}
// Обновление отображения в зависимости от авторизации
function updateReviewFormDisplay() {
    const currentUser = getCurrentUser();
    const authNotice = document.getElementById('auth-notice');
    const reviewForm = document.getElementById('review-form');
    
    if (currentUser) {
        // Пользователь авторизован - скрываем уведомление
        if (authNotice) authNotice.style.display = 'none';
        if (reviewForm) reviewForm.style.opacity = '1';
    } else {
        // Пользователь НЕ авторизован - показываем уведомление
        if (authNotice) authNotice.style.display = 'block';
        if (reviewForm) reviewForm.style.opacity = '0.6';
    }
}
// Настройка формы отзыва
function setupReviewForm() {
    const reviewForm = document.getElementById('review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }
}
// Обработка отправки отзыва
async function handleReviewSubmit(e) {
    e.preventDefault();
    
    // Проверяем авторизацию - ОБЯЗАТЕЛЬНО
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showNotification('Для написания отзыва необходимо войти в аккаунт', 'warning');
        document.getElementById('login-option').click(); // Открываем окно входа
        return;
    }
    
    if (currentRating === 0) {
        showNotification('Пожалуйста, поставьте оценку', 'warning');
        return;
    }
    
    if (!currentReviewType) {
        showNotification('Пожалуйста, выберите тип отзыва', 'warning');
        return;
    }
    
    if (currentReviewType === 'product' && !selectedProductId) {
        showNotification('Пожалуйста, выберите товар', 'warning');
        return;
    }
    
    const title = document.getElementById('review-title').value.trim();
    const content = document.getElementById('review-content').value.trim();
    
    if (!title || !content) {
        showNotification('Пожалуйста, заполните все поля', 'warning');
        return;
    }
    
    try {
        const reviewData = {
            userId: currentUser.id,
            productId: currentReviewType === 'product' ? selectedProductId : null,
            rating: currentRating,
            title: title,
            content: content
        };
        
        console.log('Отправляем отзыв:', reviewData);
        
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });
        
        if (response.ok) {
            const result = await response.json();
            showNotification('Отзыв успешно добавлен!', 'success');
            
            // Очищаем форму
            document.getElementById('review-form').reset();
            currentRating = 0;
            highlightStars(0);
            
            // Перезагружаем отзывы
            await loadReviews();
            
        } else {
            const errorData = await response.json();
            showNotification(errorData.error || 'Ошибка при добавлении отзыва', 'error');
        }
        
    } catch (error) {
        console.error('Ошибка при отправке отзыва:', error);
        showNotification('Ошибка при отправке отзыва', 'error');
    }
}
// Загрузка категорий и товаров в селекторы
async function loadProducts() {
    try {
        // Загружаем категории
        const categoriesResponse = await fetch('/api/categories');
        const productsResponse = await fetch('/api/products');
        
        if (!categoriesResponse.ok || !productsResponse.ok) return;
        
        const categories = await categoriesResponse.json();
        const products = await productsResponse.json();
        
        // Заполняем селектор категорий
        const categorySelect = document.getElementById('category-select');
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">-- Выберите категорию --</option>';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        }
        
        // Заполняем фильтр товаров для списка отзывов
        const productFilter = document.getElementById('product-filter');
        if (productFilter) {
            productFilter.innerHTML = '<option value="">Все товары</option>';
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name;
                productFilter.appendChild(option);
            });
        }
        
    } catch (error) {
        console.error('Ошибка загрузки категорий и товаров:', error);
    }
}
// Загрузка товаров по категории
async function loadProductsByCategory(categoryId) {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) return;
        
        const products = await response.json();
        const categoryProducts = products.filter(product => product.categoryId === categoryId);
        
        const productSelect = document.getElementById('product-select');
        if (productSelect) {
            productSelect.innerHTML = '<option value="">-- Выберите товар --</option>';
            categoryProducts.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name;
                productSelect.appendChild(option);
            });
        }
        
    } catch (error) {
        console.error('Ошибка загрузки товаров по категории:', error);
    }
}
// Загрузка отзывов
async function loadReviews() {
    try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
            console.error('Ошибка загрузки отзывов:', response.status);
            return;
        }
        
        allReviews = await response.json();
        filteredReviews = [...allReviews];
        displayReviews();
        
        console.log('Загружено отзывов:', allReviews.length);
        
    } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
    }
}
// Настройка фильтров
function setupFilters() {
    const ratingFilter = document.getElementById('rating-filter');
    const typeFilter = document.getElementById('type-filter');
    const productFilter = document.getElementById('product-filter');
    
    [ratingFilter, typeFilter, productFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}
// Применение фильтров
function applyFilters() {
    const ratingFilter = document.getElementById('rating-filter');
    const typeFilter = document.getElementById('type-filter');
    const productFilter = document.getElementById('product-filter');
    
    filteredReviews = [...allReviews];
    
    // Фильтр по рейтингу
    if (ratingFilter && ratingFilter.value) {
        const rating = parseInt(ratingFilter.value);
        filteredReviews = filteredReviews.filter(review => review.rating === rating);
    }
    
    // Фильтр по типу
    if (typeFilter && typeFilter.value) {
        const type = typeFilter.value;
        if (type === 'store') {
            filteredReviews = filteredReviews.filter(review => !review.product_id);
        } else if (type === 'product') {
            filteredReviews = filteredReviews.filter(review => review.product_id);
        }
    }
    
    // Фильтр по товару
    if (productFilter && productFilter.value) {
        const productId = parseInt(productFilter.value);
        filteredReviews = filteredReviews.filter(review => review.product_id === productId);
    }
    
    displayReviews();
}
// Отображение отзывов
function displayReviews() {
    const container = document.getElementById('reviews-container');
    
    if (!container) return;
    
    if (filteredReviews.length === 0) {
        container.innerHTML = `
            <div class="empty-reviews">
                <i class="fas fa-comments"></i>
                <h4>Пока нет отзывов</h4>
                <p>Станьте первым, кто оставит отзыв!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredReviews.map(review => createReviewCard(review)).join('');
}
// Создание карточки отзыва
function createReviewCard(review) {
    const isStoreReview = !review.product_id;
    const reviewType = isStoreReview ? 'Отзыв о магазине' : `Отзыв о товаре: ${review.product_name || 'Товар'}`;
    
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="review-info">
                    <div class="reviewer-avatar">
                        ${getAuthorInitials(review.author_name)}
                    </div>
                    <div class="reviewer-details">
                        <h4>${review.author_name}</h4>
                        <div class="review-type">${reviewType}</div>
                        <div class="review-date">${formatDate(review.created_at)}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <div class="review-body">
                <h5>${review.title}</h5>
                <p>${review.content}</p>
            </div>
        </div>
    `;
}
// Получение инициалов автора
function getAuthorInitials(name) {
    if (!name) return 'А';
    const words = name.split(' ');
    if (words.length >= 2) {
        return words[0][0] + words[1][0];
    }
    return name[0] || 'А';
}
// Генерация звезд для рейтинга
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star star-filled"></i>';
        } else {
            stars += '<i class="far fa-star star-empty"></i>';
        }
    }
    return stars;
}
// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('ru-RU', options);
}
// Получение текущего пользователя
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}
// Показ уведомлений с анимацией
function showNotification(message, type = 'info') {
    // Создаем контейнер для уведомлений если его нет
    let container = document.getElementById('notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
    
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    let icon, bgColor, textColor;
    switch (type) {
        case 'success':
            icon = '✓';
            bgColor = '#d4edda';
            textColor = '#155724';
            break;
        case 'error':
            icon = '✕';
            bgColor = '#f8d7da';
            textColor = '#721c24';
            break;
        case 'warning':
            icon = '⚠';
            bgColor = '#fff3cd';
            textColor = '#856404';
            break;
        default:
            icon = 'ℹ';
            bgColor = '#d1ecf1';
            textColor = '#0c5460';
    }
    
    notification.style.backgroundColor = bgColor;
    notification.style.color = textColor;
    notification.innerHTML = `<span style="font-weight: bold;">${icon}</span> ${message}`;
    
    container.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Убираем уведомление через 4 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}
// Слушаем события авторизации
document.addEventListener('userLoggedIn', () => {
    updateReviewFormDisplay();
});
document.addEventListener('userLoggedOut', () => {
    updateReviewFormDisplay();
});
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, что мы на странице отзывов
    if (window.location.pathname.includes('reviews.html')) {
        initReviews();
        
        // Слушаем изменения в localStorage для синхронизации авторизации
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser') {
                setTimeout(() => {
                    updateReviewFormDisplay();
                }, 100);
            }
        });
        
        // Периодически проверяем статус авторизации
        setInterval(() => {
            updateReviewFormDisplay();
        }, 1000);
    }
});
// Экспорт для использования в других скриптах
if (typeof window !== 'undefined') {
    window.reviewsSystem = {
        updateAuthDisplay,
        showNotification,
        getCurrentUser
    };
}