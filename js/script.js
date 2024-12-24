const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
//Singgle Product SCRIPT//
var mainImg = document.getElementById("MainImg");
var smallImg = document.getElementsByClassName("small-img");
smallImg[0].onclick = function() {
    mainImg.src = smallImg[0].src;
}
smallImg[1].onclick = function () {
    mainImg.src = smallImg[1].src;
}
smallImg[2].onclick = function () {
    mainImg.src = smallImg[2].src;
}
smallImg[3].onclick = function () {
    mainImg.src = smallImg[3].src;
}



function addToCart(name, defaultPrice, image) {
    showConfirmAst(`Apakah Anda ingin menambahkan produk "${name}" ke keranjang?`).then(userConfirmed => {
        if (userConfirmed) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const productData = JSON.parse(localStorage.getItem(name));
            const price = productData ? parseFloat(productData.price.replace(/\./g, '').replace('Rp', '').trim()) : defaultPrice;


            const id = name + "-" + new Date().getTime();

            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

          
        }
    });
}



function showConfirmAst(message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmAst');
        const messageElement = document.getElementById('confirmMessage');
        const yesButton = document.getElementById('confirmYes');
        const noButton = document.getElementById('confirmNo');

        messageElement.textContent = message;
        modal.style.display = 'flex';

        yesButton.onclick = function() {
            modal.style.display = 'none';
            resolve(true);
        };

        noButton.onclick = function() {
            modal.style.display = 'none';
            resolve(false);
        };
    });
}

function showCustomAlert(message) {
    const modal = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');


    if (alertMessage) {
        alertMessage.textContent = message;
    }

    if (modal) {
        modal.style.display = 'flex';
    }

    document.getElementById('closeAlert').addEventListener('click', function() {
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

// script buy opsi //


function showCheckoutForm() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'flex';
}

function closeCheckoutForm() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'none';
}


function checkoutCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];


    
    showCheckoutForm();
}

function openCheckoutModal(id, name, price, image) {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = 'block';
    

    checkoutModal.dataset.id = id;
    checkoutModal.dataset.name = name;
    checkoutModal.dataset.price = price;
    checkoutModal.dataset.image = image;
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = 'none';
}

document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const number = document.getElementById('nomor').value;
    const address = document.getElementById('address').value;
    const shipping = document.getElementById('shipping').value;

    const checkoutModal = document.getElementById('checkoutModal');
    const productId = checkoutModal.dataset.id;
    const productName = checkoutModal.dataset.name;
    const productPrice = parseInt(checkoutModal.dataset.price, 10);
    const productImage = checkoutModal.dataset.image;

    const purchasedItems = JSON.parse(localStorage.getItem('purchased')) || [];
    const existingItem = purchasedItems.find((item) => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        purchasedItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1,
            buyer: { name, number, address, shipping },
        });
    }

    localStorage.setItem('purchased', JSON.stringify(purchasedItems));

    alert(`Terima kasih, ${name}!.
\nKami Akan Mengirim Pesan Ke Nomor Whatshapp ini ${number} Jika Pesanan Sudah Sampai Tujuan    
\nPaket Akan Kami Kirimkan Ke Alamat: ${address}
\nPaket Pengiriman: ${shipping === 'standard' ? 'Standard (4 hari)' : 'Express (2 hari)'}
\nBarang Anda akan dikirim ke alamat Anda dalam waktu paling lama 6 hari.`);

    closeCheckoutModal();
    document.getElementById('checkoutForm').reset();
});

document.getElementById('cancelCheckout').addEventListener('click', function () {
    closeCheckoutModal();
});
