// 1. Particle Background Setup
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 60 },
            "color": { "value": "#f5d300" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3 },
            "line_linked": { "enable": true, "distance": 150, "color": "#f5d300", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2 }
        },
        "interactivity": {
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
        }
    });
}

// 2. Cart System Functions
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElem = document.getElementById('cart-count');
    if (countElem) countElem.innerText = cart.length;
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let index = cart.findIndex(item => item.name === name);
    if (index !== -1) cart[index].quantity += 1;
    else cart.push({ name: name, price: price, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert("เพิ่ม " + name + " ลงในตะกร้าแล้ว!");
}

function renderCart() {
    const cartContent = document.getElementById('cart-content');
    const totalPriceElem = document.getElementById('total-price');
    if (!cartContent) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartContent.innerHTML = '<h3>ตะกร้าว่างเปล่า</h3>';
        totalPriceElem.innerText = '';
        return;
    }

    let total = 0;
    let html = `<table><thead><tr><th>สินค้า</th><th>ราคา</th><th>จำนวน</th><th>รวม</th><th>จัดการ</th></tr></thead><tbody>`;
    cart.forEach((item, i) => {
        let sum = item.price * item.quantity;
        total += sum;
        html += `<tr><td>${item.name}</td><td>${item.price.toLocaleString()}</td><td>${item.quantity}</td><td>${sum.toLocaleString()}</td>
                 <td><button onclick="removeItem(${i})" style="background:#ff4757; color:white;">ลบ</button></td></tr>`;
    });
    html += `</tbody></table>`;
    cartContent.innerHTML = html;
    totalPriceElem.innerText = `ยอดรวมสุทธิ: ${total.toLocaleString()} บาท`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function clearCart() {
    if(confirm("ต้องการลบสินค้าทั้งหมดหรือไม่?")) {
        localStorage.removeItem('cart');
        renderCart();
        updateCartCount();
    }
}

// 3. Modal Functions (Content Page)
function showDetail(name, desc, price, img) {
    document.getElementById("pName").innerText = name;
    document.getElementById("pDesc").innerText = desc;
    document.getElementById("pPrice").innerText = "ราคา: " + price.toLocaleString() + " บาท";
    document.getElementById("pImg").src = img;
    document.getElementById("productModal").style.display = "flex";
}
function closeModal() {
    const modal = document.getElementById("productModal");
    if(modal) modal.style.display = "none";
}

// Initial Run
window.onload = function() {
    updateCartCount();
    if (document.getElementById('cart-content')) renderCart();
};