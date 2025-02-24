document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    const orderModal = new bootstrap.Modal(document.getElementById("orderModal"));

    let cart = {};

    // Agregar producto al carrito
    window.addToCart = function (name, price) {
        if (!cart[name]) {
            cart[name] = { name, price, quantity: 1 };
        } else {
            cart[name].quantity += 1;
        }
        updateCart();
    };

    // Actualizar el carrito
    function updateCart() {
        cartList.innerHTML = "";
        let totalPrice = 0;

        Object.values(cart).forEach(item => {
            let li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            li.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <div>
                    <button class="btn btn-sm btn-outline-secondary" onclick="decreaseItem('${item.name}')">-</button>
                    <button class="btn btn-sm btn-outline-primary" onclick="increaseItem('${item.name}')">+</button>
                    <button class="btn btn-sm btn-danger" onclick="removeItem('${item.name}')">❌</button>
                </div>
                <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartList.appendChild(li);
            totalPrice += item.price * item.quantity;
        });

        cartTotal.textContent = totalPrice.toFixed(2);
    }

    // Aumentar cantidad de un producto
    window.increaseItem = function (name) {
        cart[name].quantity += 1;
        updateCart();
    };

    // Disminuir cantidad de un producto
    window.decreaseItem = function (name) {
        if (cart[name].quantity > 1) {
            cart[name].quantity -= 1;
        } else {
            delete cart[name];
        }
        updateCart();
    };

    // Eliminar producto del carrito
    window.removeItem = function (name) {
        delete cart[name];
        updateCart();
    };

    // Confirmar pedido y mostrar modal
    window.confirmOrder = function () {
        if (Object.keys(cart).length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        orderModal.show();
        resetCart();
    };

    // Restablecer el carrito
    window.resetCart = function () {
        cart = {};
        updateCart();
    };
});
