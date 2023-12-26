// sidebar-component.js
class SidebarComponent extends HTMLElement {
    connectedCallback() {
        this.render();
        document.addEventListener('cartUpdated', (event) => {
            const updatedCart = event.detail;
            this.updateCart(updatedCart);
        });
    }

    render() {
        this.innerHTML = `
        <style>
        @import url('./tools.css');
        @import url('./style.css');
        @import url('./addtocart.css');
    </style>
    
            <div class="sidebar">
             <div class="head">
              <p>My Cart</p>
            </div>
            <div id="cartItem">Your cart is empty</div>
            <i class="fa-solid fa-cart-shopping"></i>
            <i class="fa-solid fa-cart-shopping"></i>
      
            <div class="foot">
              <h3>Total</h3>
              <h2 id="total">$ 0.00</h2>
            </div>
          </div>
        `;
    }


    
    
}

customElements.define('sidebar-component', SidebarComponent);
