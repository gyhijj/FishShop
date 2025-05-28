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
function addToCart(productId) {
    console.log('🛒 Добавляем товар ID:', productId);
    
    // Проверяем авторизацию
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        showNotification('Войдите в аккаунт, чтобы добавить товар в корзину', 'warning');
        return;
    }
    
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
    
    // Показываем уведомление
    showNotification(`${product.name} добавлен в корзину`, 'success');
    
    // Обновляем счетчик и модальное окно
    updateCartCount();
    updateCartModal();
}

// Удалить товар из корзины
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    
    const product = products.find(p => p.id === productId);
    showNotification(`${product?.name || 'Товар'} удален из корзины`, 'info');
    
    updateCartCount();
    updateCartModal();
}

// Изменить количество товара
function updateQuantity(productId, newQuantity) {
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
    }
}

// Очистить корзину
function clearCart() {
    localStorage.removeItem('cart');
    showNotification('Корзина очищена', 'info');
    updateCartCount();
    updateCartModal();
}

// Обновить счетчик товаров в корзине
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'block' : 'none';
    });
}

// Обновить содержимое модального окна корзины
function updateCartModal() {
    const cartModalBody = document.getElementById('cart-modal-body');
    if (!cartModalBody) {
        console.log('Элемент cart-modal-body не найден');
        return;
    }
    
    const cart = getCart();
    console.log('Корзина содержит:', cart);
    
    if (cart.length === 0) {
        cartModalBody.innerHTML = `
            <div class="cart-empty" style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 60px; margin-bottom: 20px; color: #ddd;"></i>
                <h3 style="margin-bottom: 10px;">Корзина пуста</h3>
                <p>Добавьте товары в корзину</p>
            </div>
        `;
        
        // Скрываем итого
        const totalAmount = document.getElementById('cart-total-amount');
        if (totalAmount) totalAmount.textContent = '0 ₽';
        return;
    }
    
    let cartHtml = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const itemTotal = product.price * item.quantity;
        totalPrice += itemTotal;
        
        cartHtml += `
            <div class="cart-item" style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
                <div class="cart-item-image" style="width: 60px; height: 60px; margin-right: 15px; flex-shrink: 0;">
                    <img src="${product.images[0]}" alt="${product.name}" 
                         style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">
                </div>
                <div class="cart-item-info" style="flex: 1; min-width: 0;">
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
    });
    
    cartModalBody.innerHTML = cartHtml;
    
    // Обновляем общую сумму
    const totalAmount = document.getElementById('cart-total-amount');
    if (totalAmount) {
        totalAmount.textContent = `${formatPrice(totalPrice)} ₽`;
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
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

// Оформить заказ
function checkout() {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        showNotification('Войдите в аккаунт для оформления заказа', 'warning');
        return;
    }
    
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Корзина пуста', 'warning');
        return;
    }
    
    // Простое оформление заказа
    const user = JSON.parse(userStr);
    const totalPrice = cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
    
    // Сохраняем заказ для профиля
    const order = {
        id: Date.now(),
        userId: user.id,
        total_price: totalPrice,
        status: 'processing',
        created_at: new Date().toISOString(),
        items: cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                name: product ? product.name : 'Неизвестный товар',
                price: product ? product.price : 0,
                quantity: item.quantity
            };
        })
    };
    
    // Сохраняем в localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Очищаем корзину и закрываем модальное окно
    clearCart();
    hideCartModal();
    showNotification('Заказ успешно оформлен! Спасибо за покупку!', 'success');
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
    
    console.log('🛒 Корзина успешно инициализирована');
}

console.log('🛒 Простая корзина на localStorage загружена');