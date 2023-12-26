// render-tool-element.js
class RenderToolElementComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        const toolElement = document.createElement('div');
        toolElement.className = 'box';
        toolElement.innerHTML = `
            <link rel="stylesheet" href="addtocart.css">
            <div class='img-box'>
                <img class='images' src=./image/${this.getAttribute('image')} ></img>
            </div>
            <div class='bottom'>
                <p>${this.getAttribute('name')}</p>
                <p>${this.getAttribute('sub')}</p>  
                <h2>${parseFloat(this.getAttribute('price')).toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}, ₮</h2>
                <button onclick='addtocart("${this.getAttribute('name')}")'>Add to cart</button>
            </div>
        `;

        shadowRoot.appendChild(toolElement);
    }
}

customElements.define('render-tool-element-component', RenderToolElementComponent);
