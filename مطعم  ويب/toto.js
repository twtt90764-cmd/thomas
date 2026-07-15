// مصفوفة لتخزين عناصر السلة
let cart = [];

// فتح وإغلاق السلة الجانبية
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

// إضافة وجبة للسلة
function addToCart(name, price) {
    // التحقق إذا كانت الوجبة مضافة مسبقاً
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    
    updateCartUI();
}

// حذف وجبة من السلة
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

// تحديث واجهة السلة والعداد والأسعار
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // تحديث عدد العناصر فوق الأيقونة
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">السلة فارغة حالياً</p>';
        cartTotal.innerText = 0;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>${item.price} ج.م × ${item.quantity}</small>
                </div>
                <i class="fas fa-trash" onclick="removeFromCart('${item.name}')"></i>
            </div>
        `;
    });
    
    cartTotal.innerText = total;
}

// إتمام الطلب
function checkout() {
    if (cart.length === 0) {
        alert("سلتك فارغة! أضف بعض الأطباق أولاً.");
        return;
    }
    alert("تم تسجيل طلبك بنجاح! المجموع: " + document.getElementById('cartTotal').innerText + " جنيه. جاري تجهيز الأكل!");
    cart = [];
    updateCartUI();
    toggleCart();
}

// حجز الطاولة
function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    alert("شكراً لك يا " + name + "، تم استلام طلب حجز الطاولة ليوم " + date + " بنجاح!");
    document.getElementById('resForm').reset();
}
