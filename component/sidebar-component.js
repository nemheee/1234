class SidebarComponent extends HTMLElement {
  connectedCallback() {
      this.render();
      this.addEventListeners(); // Call the method to add event listeners
      document.addEventListener('cartUpdated', (event) => {
          const updatedCart = event.detail;
          this.updateCart(updatedCart);
      });
  }

  addEventListeners() {
      const cartIcon = document.querySelector('.cart');
      if (cartIcon) {
          cartIcon.addEventListener('click', () => {
              this.toggleSidebarVisibility();
          });
      }
  }

  toggleSidebarVisibility() {
      const mySidebar = document.querySelector('sidebar-component');
      if (mySidebar) {
        mySidebar.style.padding= "1rem";
          const isSidebarHidden =
              mySidebar.style.display === 'none' || mySidebar.style.display === '';
          mySidebar.style.display = isSidebarHidden ? 'block' : 'none';
      }
  }

  render() {
      this.innerHTML = `
      <style>
      @import url('./tools.css');
      @import url('./style.css');
      @import url('./addtocart.css');
      
  </style>
  
           <div class="head">
            <p>My Cart</p>
          </div>
          <div id="cartItem">Your cart is empty</div>
          <i class="fa-solid fa-cart-shopping"></i>
    
          <div class="foot">
            <h3>Total</h3>
            <h2 id="total">$ 0.00</h2>
          </div>
      `;
      const mySidebar = document.querySelector('sidebar-component');
      if (mySidebar) {
          mySidebar.style.display = 'none';
      }
  }
}

customElements.define('sidebar-component', SidebarComponent);
