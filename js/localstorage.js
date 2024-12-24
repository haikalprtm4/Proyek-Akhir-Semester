function loadCart() {
    const cartBody = document.getElementById('cart-body');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cartBody.innerHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const row = `
            <tr>
                <td><button class="buttonsz" onclick="removeFromCart(${index})">Remove</button></td>
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;" ></td>
                <td>${item.name}</td>
                <td>Rp${item.price.toLocaleString()}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>Rp${itemTotal.toLocaleString()}</td>
            </tr>
        `;
        cartBody.innerHTML += row;
    });

    document.getElementById('cart-subtotal').innerText = `Rp${subtotal.toLocaleString()}`;
    document.getElementById('cart-total').innerText = `Rp${subtotal.toLocaleString()}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); 
}

function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

window.onload = loadCart;


function loadPurchasedItems() {
    const purchasedItems = JSON.parse(localStorage.getItem('purchased')) || [];
    const beliProductTable = document.getElementById('beli-product');

    beliProductTable.innerHTML = "";

    if (purchasedItems.length === 0) {
        beliProductTable.innerHTML = "<tr><td colspan='6'>Belum ada produk yang dibeli.</td></tr>";
        return;
    }

    purchasedItems.forEach((item) => {
        const priceFormatted = item.price ? `Rp${item.price.toLocaleString()}` : "Harga tidak tersedia";
        const totalFormatted = (item.price && item.quantity) ? `Rp${(item.price * item.quantity).toLocaleString()}` : "Total tidak tersedia";

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><button class="buttonsz" onclick="removePurchasedItem('${item.id}')">Batalkan</button></td>
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td>${item.name}</td>
            <td>${priceFormatted}</td>
            <td>${item.quantity}</td>
            <td>${totalFormatted}</td>
        `;
        beliProductTable.appendChild(row);
    });
}

function removePurchasedItem(id) {
    let purchasedItems = JSON.parse(localStorage.getItem('purchased')) || [];
    purchasedItems = purchasedItems.filter((item) => item.id !== id);
    localStorage.setItem('purchased', JSON.stringify(purchasedItems));
    loadPurchasedItems(); 
}

loadPurchasedItems();


document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const nomor = document.getElementById('nomor').value;
    const address = document.getElementById('address').value;
    const shippingOption = document.getElementById('shipping').value;

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const purchasedItems = JSON.parse(localStorage.getItem('purchased')) || [];

    cartItems.forEach(cartItem => {
        const existingItem = purchasedItems.find(item => item.id === cartItem.id);
        if (existingItem) {

            existingItem.quantity += cartItem.quantity;
        } else {
            purchasedItems.push({
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price,
                quantity: cartItem.quantity,
                image: cartItem.image,
                buyer: {
                    name: name,
                    number: nomor,
                    address: address,
                    shipping: shippingOption
                }
            });
        }
    });


    localStorage.setItem('purchased', JSON.stringify(purchasedItems));
    localStorage.removeItem('cart'); 


    alert(`Terima kasih, ${name}!.
    \nKami Akan Mengirim Pesan Ke Nomor Whatshapp ini ${nomor} Jika Pesanan Sudah Sampai Tujuan    
    \nPaket Akan Kami Kirimkan Ke Alamat: ${address}
    \nPaket Pengiriman: ${shippingOption === 'standard' ? 'Standard (4 hari)' : 'Express (2 hari)'}
    \nBarang Anda akan dikirim ke alamat Anda dalam waktu paling lama 6 hari.`);


    closeCheckoutForm();
    location.reload();
});


document.getElementById('cancelCheckout').addEventListener('click', function () {
    closeCheckoutForm();
});



