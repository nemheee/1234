import Tool from './tool.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

async function addtocart(toolName) {
    const toolsData = await Tool.fetchToolsData();
    const categories = [...new Set(toolsData.map(item => item))];
    
    const existingItem = cart.find(item => item.name === toolName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const toolData = toolsData.find(tool => tool.name === toolName);
        cart.push({ ...toolData, quantity: 1 });
    }

    document.getElementById("count").innerHTML = cart.length;

    displaycart();
    saveCartToLocalStorage();
}

function delElement(index) {
    cart.splice(index, 1);
    document.getElementById("count").innerHTML = '0';
    displaycart();
    saveCartToLocalStorage();
}

document.addEventListener('DOMContentLoaded', async function () {

    
    const toolsData = await Tool.fetchToolsData();
    const categories = [...new Set(toolsData.map(item => item))];
    let i = 0;

    const toolsContainer = document.getElementById('tools-container');
    Tool.render(toolsContainer, categories);

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById("count").innerHTML = cart.length;
    displaycart();
});



function displaycart() {
    let totalQuantity = 0;
    let total = 0;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    } else {
        for (const items of cart) {
            const {  price, quantity } = items;
            total += price * quantity;
            totalQuantity += quantity;
        }

        document.getElementById("total").innerHTML = (total).toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + ' ₮';
        document.getElementById("count").innerHTML = totalQuantity;
        document.getElementById("cartItem").innerHTML = cart.map((items, index) => {
            const { image, price, quantity, name } = items;

            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=./image/${image}>
                    </div>
                    <p style='font-size:12px;'>${name}</p>
                    <div class="nemeh">
                        <button onclick='decreaseQuantity(${index})'>-</button>
                        <span>${quantity}</span>
                        <button onclick='increaseQuantity(${index})'>+</button>
                    </div>
                    <h2 style='font-size: 15px;'> ${(price * quantity).toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1 })} ₮</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');
    }
}

function increaseQuantity(index) {
    const item = cart[index];
    item.quantity += 1;
    displaycart();
    saveCartToLocalStorage();
}

function decreaseQuantity(index) {
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity -= 1;
        displaycart();
        saveCartToLocalStorage();
    }
    
}
export {
    addtocart,
    delElement,
    displaycart,
    increaseQuantity,
    decreaseQuantity,
};