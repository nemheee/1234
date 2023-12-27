// import './mysidebar-component'
// import './sidebar-component'
// import './tools-container-component'
export default class Tool {
    constructor(name, price, category, sub, image) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.category = category;
        this.sub = sub;
    }
    
    static async fetchAndRenderTools(container, category, billiardContainer) {
        try {
            const toolsData = await this.fetchToolsData();
            const filteredTools = category
                ? toolsData.filter(tool => tool.category === category)
                : toolsData;
    
            this.render(container, filteredTools);
    
            if (billiardContainer && container.id === 'billiard-container') {
                this.render(billiardContainer, filteredTools);
            }
    
            const searchParams = new URLSearchParams(window.location.search);
    
            if (category) {
                searchParams.set('category', category);
            } else {
                searchParams.delete('category');
            }
    
            window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
        } catch (error) {
            console.error('Error fetching and rendering tools:', error);
        }
    }
    
static getContainer(containerId) {
    const container = document.getElementById(containerId);

    return container.shadowRoot || container;
}

    
    static render(billiardContainer, tools) {
        billiardContainer.innerHTML = '';
        const toolElements = tools.map(toolData => {
            const toolObj = new Tool(toolData.name, toolData.price, toolData.category, toolData.sub, toolData.image);
            return toolObj.renderToolElement();
        });

        toolElements.forEach(toolElement => {
            billiardContainer.appendChild(toolElement);
        });
    }

    renderToolElement() {
        // Create a shadow root
        const shadowRoot = document.createElement('div').attachShadow({ mode: 'open' });
    
        // Create the tool element within the shadow DOM
        const toolElement = document.createElement('div');
        toolElement.className = 'box';
        toolElement.innerHTML = `
            <link rel="stylesheet" href="addtocart.css">
            <div class='img-box'>
                <img class='images' src=./image/${this.image} ></img>
            </div>
            <div class='bottom'>
                <p>${this.name}</p>
                <p>${this.sub}</p>  
                <h2>${this.price.toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}, ₮</h2>
                <button onclick='addtocart("${this.name}")'>Add to cart</button>
            </div>
        `;
    
        shadowRoot.appendChild(toolElement);
    
        const container = document.createElement('div');
    
        container.attachShadow({ mode: 'open' }).appendChild(shadowRoot);
    
        return container;
    }
    

    static async fetchToolsData() {
        try {
            const response = await fetch('tools.json');

            if (!response.ok) {
                throw new Error(`Failed to fetch tools. Status: ${response.status}`);
            }

            const tools = await response.json();
            return tools;
        } catch (error) {
            console.error('Error fetching tools data:', error);
            return [];
        }
    }
    static addEventListeners() {
        const cartIcon = document.querySelector('.cart');
        const mySidebar = document.querySelector('.sidebar');
    
        if (cartIcon && mySidebar) {
            cartIcon.addEventListener('click', function () {
                const isSidebarHidden = mySidebar.style.display === 'none' || mySidebar.style.display === '';
                mySidebar.style.display = isSidebarHidden ? 'block' : 'none';
            });
        }
        const billiardsLink = document.getElementById('billiard-link');
        const racketsLink = document.getElementById('racket-link');
        const glovesLink = document.getElementById('glove-link');
        const ballsLink = document.getElementById('ball-link');
        const closetsLink = document.getElementById('closet-link');
        const accessoriesLink = document.getElementById('accessories-link');
        const billiardContainer = document.getElementById('billiard-container');
        const allContainer = document.getElementById('all');

        if (allContainer && billiardsLink && racketsLink && glovesLink && ballsLink && closetsLink && accessoriesLink && billiardContainer) {

            allContainer.addEventListener('click', async () => {
                console.log("ajillj bn")
                await this.fetchAndRenderTools('tools-container', '', billiardContainer);
            });

            billiardsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'table', billiardContainer);
            });

            racketsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'racket', billiardContainer);
            });
            glovesLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'glove', billiardContainer)
            });
            ballsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'ball', billiardContainer)
            });
            closetsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'closet', billiardContainer)
            });
            accessoriesLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'accessories', billiardContainer)
            });
        } else {
            console.error('Error: Billiards or Hitters link not found in the DOM', billiardContainer);
        }
    }

    
}
Tool.addEventListeners();

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
    const toolsContainerComponent = document.querySelector('tools-container-component');
    await Tool.fetchAndRenderTools(toolsContainerComponent, '', null);

    Tool.addEventListeners();

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
