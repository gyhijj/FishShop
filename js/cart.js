// Простая корзина на localStorage - ПОЛНОСТЬЮ РАБОЧАЯ ВЕРСИЯ

// Получить корзину из localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Сохранить корзину в localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Добавить товар в корзину
async function addToCart(productId) {
    console.log('🛒 Добавляем товар ID:', productId);
    
    // Проверяем авторизацию
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        showNotification('Войдите в аккаунт, чтобы добавить товар в корзину', 'warning');
        return;
    }
    
    try {
        // Загружаем товары из API
        const response = await fetch('/api/products');
        const products = await response.json();
        
        // Находим товар
        const product = products.find(p => p.id === productId);
        if (!product) {
            showNotification('Товар не найден', 'error');
            return;
        }
        
        // Получаем корзину
        let cart = getCart();
        
        // Проверяем, есть ли товар уже в корзине
        const existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
            // Увеличиваем количество
            existingItem.quantity += 1;
        } else {
            // Добавляем новый товар
            cart.push({
                productId: productId,
                quantity: 1
            });
        }
        
        // Сохраняем корзину
        saveCart(cart);
        
        // Обновляем интерфейс
        updateCartCount();
        updateCartModal();
        
        showNotification(`${product.name} добавлен в корзину`, 'success');
        console.log('✓ Товар добавлен в корзину');
        
    } catch (error) {
        console.error('Ошибка при добавлении в корзину:', error);
        showNotification('Ошибка при добавлении товара', 'error');
    }
}

// Удалить товар из корзины
function removeFromCart(productId) {
    console.log('🛒 Удаляем товар ID:', productId);
    
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    
    saveCart(cart);
    updateCartCount();
    updateCartModal();
    
    showNotification('Товар удален из корзины', 'info');
    console.log('✓ Товар удален из корзины');
}

// Обновить количество товара
function updateQuantity(productId, newQuantity) {
    console.log('🛒 Обновляем количество товара ID:', productId, 'Количество:', newQuantity);
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    let cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        updateCartCount();
        updateCartModal();
        console.log('✓ Количество товара обновлено');
    }
}

// Очистить корзину
function clearCart() {
    console.log('🛒 Очищаем корзину');
    
    localStorage.removeItem('cart');
    updateCartCount();
    updateCartModal();
    
    showNotification('Корзина очищена', 'info');
    console.log('✓ Корзина очищена');
}

// Обновить счетчик корзины
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Обновляем счетчик на кнопке корзины
    const cartCounter = document.querySelector('.cart-count');
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Обновить модальное окно корзины
async function updateCartModal() {
    const cart = getCart();
    const cartModalBody = document.getElementById('cart-modal-body');
    
    if (!cartModalBody) {
        console.log('Элемент cart-modal-body не найден');
        return;
    }
    
    if (cart.length === 0) {
        cartModalBody.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 16px;">🛒</div>
                <p style="margin: 0; font-size: 16px;">Ваша корзина пуста</p>
            </div>
        `;
        
        // Обновляем общую сумму
        const totalAmount = document.getElementById('cart-total-amount');
        if (totalAmount) {
            totalAmount.textContent = '0 ₽';
        }
        return;
    }
    
    try {
        // Загружаем товары из API
        const response = await fetch('/api/products');
        const products = await response.json();
        
        let totalPrice = 0;
        
        const cartHtml = cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return '';
            
            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;
            
            const productImage = product.images && product.images[0] ? product.images[0] : product.image;
            
            return `
                <div style="display: flex; align-items: center; padding: 16px; border-bottom: 1px solid #eee; gap: 12px;">
                    <div style="width: 60px; height: 60px; flex-shrink: 0; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
                        <img src="${productImage}" alt="${product.name}" 
                             style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <h5 style="margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">${product.name}</h5>
                        <div style="color: #666; font-size: 13px; margin-bottom: 8px;">${formatPrice(product.price)} ₽</div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="display: flex; align-items: center; gap: 8px; border: 1px solid #ddd; border-radius: 4px; padding: 2px;">
                                <button onclick="updateQuantity(${product.id}, ${item.quantity - 1})" 
                                        style="width: 28px; height: 28px; border: none; background: #f8f9fa; border-radius: 2px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                    −
                                </button>
                                <span style="min-width: 24px; text-align: center; font-weight: 500;">${item.quantity}</span>
                                <button onclick="updateQuantity(${product.id}, ${item.quantity + 1})" 
                                        style="width: 28px; height: 28px; border: none; background: #f8f9fa; border-radius: 2px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                    +
                                </button>
                            </div>
                            <button onclick="removeFromCart(${product.id})" 
                                    style="color: #dc3545; background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px;">
                                🗑️
                            </button>
                        </div>
                    </div>
                    <div style="font-weight: 600; color: #2d5a2d; margin-left: 10px;">
                        ${formatPrice(itemTotal)} ₽
                    </div>
                </div>
            `;
        }).join('');
        
        cartModalBody.innerHTML = cartHtml;
        
        // Обновляем общую сумму
        const totalAmount = document.getElementById('cart-total-amount');
        if (totalAmount) {
            totalAmount.textContent = `${formatPrice(totalPrice)} ₽`;
        }
        
    } catch (error) {
        console.error('Ошибка при обновлении корзины:', error);
        cartModalBody.innerHTML = '<p>Ошибка загрузки корзины</p>';
    }
}

// Показать модальное окно корзины
function showCartModal() {
    console.log('🛒 Открываем корзину');
    updateCartModal();
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

// Скрыть модальное окно корзины
function hideCartModal() {
    console.log('🛒 Закрываем корзину');
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

// Оформить заказ
async function checkout() {
    console.log('🛒 Оформляем заказ');
    
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        showNotification('Войдите в аккаунт для оформления заказа', 'warning');
        return;
    }
    
    const user = JSON.parse(userStr);
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Корзина пуста', 'warning');
        return;
    }
    
    try {
        // Загружаем товары для расчета суммы
        const response = await fetch('/api/products');
        const products = await response.json();
        
        let totalPrice = 0;
        const orderItems = cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                totalPrice += product.price * item.quantity;
            }
            return {
                productId: item.productId,
                quantity: item.quantity
            };
        });
        
        const orderData = {
            items: orderItems,
            total: totalPrice
        };
        
        const orderResponse = await fetch(`/api/orders/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (!orderResponse.ok) {
            throw new Error('Ошибка сервера');
        }
        
        const result = await orderResponse.json();
        console.log('Заказ сохранен в базе данных:', result);
        
        // Очищаем корзину и закрываем модальное окно
        clearCart();
        hideCartModal();
        showNotification('Заказ успешно оформлен! Спасибо за покупку!', 'success');
        
    } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
        showNotification('Ошибка при оформлении заказа. Попробуйте позже.', 'error');
    }
}

// Инициализация корзины
function initCart() {
    console.log('🛒 Инициализация простой корзины на localStorage');
    
    // Обновляем счетчик и модальное окно
    updateCartCount();
    updateCartModal();
    
    // Настраиваем обработчики событий
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', showCartModal);
        console.log('✓ Кнопка корзины подключена');
    }
    
    const cartModalClose = document.getElementById('cart-modal-close');
    if (cartModalClose) {
        cartModalClose.addEventListener('click', hideCartModal);
        console.log('✓ Кнопка закрытия корзины подключена');
    }
    
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
        console.log('✓ Кнопка очистки корзины подключена');
    }
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
        console.log('✓ Кнопка оформления заказа подключена');
    }
    
    console.log('✅ Корзина полностью инициализирована');
}

// Format price function
function formatPrice(price) {
    return price.toLocaleString('ru-RU');
}