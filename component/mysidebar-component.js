class MySidebarComponent extends HTMLElement {
    constructor() {
        super();
        this.billiardContainer = document.getElementById('billiard-container'); // Assuming billiard-container is the correct ID
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
        document.addEventListener('cartUpdated', (event) => {
            const updatedCart = event.detail;
            this.updateCart(updatedCart);
        });
    }

    addEventListeners() {
        const allLink = document.getElementById('all');
        const billiardsLink = document.getElementById('billiard-link');
        const racketsLink = document.getElementById('racket-link');
        const glovesLink = document.getElementById('glove-link');
        const ballsLink = document.getElementById('ball-link');
        const closetsLink = document.getElementById('closet-link');
        const accessoriesLink = document.getElementById('accessories-link');

        if (allLink && billiardsLink && racketsLink && glovesLink && ballsLink && closetsLink && accessoriesLink) {
            allLink.addEventListener('click', async () => {
                console.log("All link clicked");
                await this.fetchAndRenderTools('tools-container', '', this.billiardContainer);
            });

            billiardsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'table', this.billiardContainer);
            });

            racketsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'racket', this.billiardContainer);
            });

            glovesLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'glove', this.billiardContainer);
            });

            ballsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'ball', this.billiardContainer);
            });

            closetsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'closet', this.billiardContainer);
            });

            accessoriesLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'accessories', this.billiardContainer);
            });
        } else {
            console.error('Error: One or more links not found in the DOM');
        }
    }

    render() {
        const shouldAddTopClass = this.getAttribute('top') === 'nemeh';

        // Creating a template element and appending it to the shadow DOM
        const template = document.createElement('template');
        template.innerHTML = `
            <div id="mySidebar" class="overlay${shouldAddTopClass ? ' overlay-top' : ''}">
                <button class="open-btn" onclick="openNav()">☰ Open Sidebar</button>
                <div class="overlay-content">
                    <a href="javascript:void(0)" class="close-btn" onclick="closeNav()">
                        <p>X</p>
                    </a>
                    <a id="all" href="#">Бүгд</a>
                    <a id="billiard-link" href="#">Билльярдын ширээ</a>
                    <a id="racket-link" href="#">Цохиур</a>
                    <a id="glove-link" href="#">Бээлий</a>
                    <a id="ball-link" href="#">Шаариг</a>
                    <a id="closet-link" href="#">Шүүгээ</a>
                    <a id="accessories-link" href="#">Шаариг хайрцагтай</a>
                    <div class="connected-container">
                    <div class="slot1-container">
                      <slot name="slot1"></slot>
                    </div>
                    <div class="slot2-container">
                      <slot name="slot2"></slot>
                    </div>
                  </div>
                </div>
            </div>`;

        // Attach the template content to the shadow DOM
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
   
        
    }


 
}

customElements.define('mysidebar-component', MySidebarComponent);
