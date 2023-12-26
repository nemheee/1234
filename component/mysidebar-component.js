// class MySidebarComponent extends HTMLElement {
//     connectedCallback() {
//         this.innerHTML = `
//             <div class="overlay">
//                 <button class="open-btn" onclick="openNav()">☰ Open Sidebar</button>
//                 <div class="overlay-content">
//                     <a href="javascript:void(0)" class="close-btn" onclick="closeNav()">
//                         <p>X</p>
//                     </a>
//                     <a id="all" href="#">Бүгд</a>
//                     <a id="billiard-link" href="#">Билльярдын ширээ</a>
//                     <a id="racket-link" href="#">Цохиур</a>
//                     <a id="glove-link" href="#">Бээлий</a>
//                     <a id="ball-link" href="#">Шаариг</a>
//                     <a id="closet-link" href="#">Шүүгээ</a>
//                     <a id="accessories-link" href="#">Шаариг хайрцагтай</a>
//                 </div>
//             </div>
//         `;
 

//         // Add event listeners
//     }  
//     static addEventListeners() {
//         const cartIcon = document.querySelector('.cart');
//         const mySidebar = document.querySelector('.sidebar');
    
//         if (cartIcon && mySidebar) {
//             cartIcon.addEventListener('click', function () {
//                 // Toggle the visibility of the sidebar
//                 const isSidebarHidden = mySidebar.style.display === 'none' || mySidebar.style.display === '';
//                 mySidebar.style.display = isSidebarHidden ? 'block' : 'none';
//             });
//         }
//         const billiardsLink = document.getElementById('billiard-link');
//         const racketsLink = document.getElementById('racket-link');
//         const glovesLink = document.getElementById('glove-link');
//         const ballsLink = document.getElementById('ball-link');
//         const closetsLink = document.getElementById('closet-link');
//         const accessoriesLink = document.getElementById('accessories-link');
//         const billiardContainer = document.getElementById('billiard-container');
//         const allContainer = document.getElementById('all');

//         if (allContainer && billiardsLink && racketsLink && glovesLink && ballsLink && closetsLink && accessoriesLink && billiardContainer) {

//             allContainer.addEventListener('click', async () => {
//                 console.log("ajillj bn")
//                 await this.fetchAndRenderTools('tools-container', '', billiardContainer);
//             });

//             billiardsLink.addEventListener('click', async () => {
//                 console.log("ajillj bn")    
//                 await this.fetchAndRenderTools('tools-container', 'table', billiardContainer);
//             });

//             racketsLink.addEventListener('click', async () => {
//                 await this.fetchAndRenderTools('tools-container', 'racket', billiardContainer);
//             });
//             glovesLink.addEventListener('click', async () => {
//                 await this.fetchAndRenderTools('tools-container', 'glove', billiardContainer)
//             });
//             ballsLink.addEventListener('click', async () => {
//                 await this.fetchAndRenderTools('tools-container', 'ball', billiardContainer)
//             });
//             closetsLink.addEventListener('click', async () => {
//                 await this.fetchAndRenderTools('tools-container', 'closet', billiardContainer)
//             });
//             accessoriesLink.addEventListener('click', async () => {
//                 await this.fetchAndRenderTools('tools-container', 'accessories', billiardContainer)
//             });
//         } else {
//             console.error('Error: Billiards or Hitters link not found in the DOM', billiardContainer);
//         }
//     }  
//     static async fetchAndRenderTools(containerId, category, billiardContainer) {
//         try {
//             const toolsData = await Tool.fetchToolsData();
//             const filteredTools = category
//                 ? toolsData.filter(tool => tool.category === category)
//                 : toolsData;
    
//             // Render the tools using the specified container
//             Tool.render(document.getElementById(containerId), filteredTools);
    
//             // If a billiard container is specified and it is different from the main container, update it with the rendered tools
//             if (billiardContainer && containerId === 'tools-container') {
//                 Tool.render(billiardContainer, filteredTools);
//             }
    
//             // Update URL search parameters
//             const searchParams = new URLSearchParams(window.location.search);
    
//             if (category) {
//                 searchParams.set('category', category);
//             } else {
//                 searchParams.delete('category');
//             }
    
//             // Update the URL without triggering a page reload
//             window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
//         } catch (error) {
//             console.error('Error fetching and rendering tools:', error);
//         }
//     }
    


// }
// MySidebarComponent.addEventListeners();

// customElements.define('mysidebar-component', MySidebarComponent);

class MySidebarComponent extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <style>
            @import url('./tools.css');
            @import url('./style.css');
            @import url('./addtocart.css');
            </style>
            <div id="mySidebar" class="overlay">
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
            </div>
        </div>
        `;
        this.addEventListener('billiardLinkClicked', (event) => {
            console.log(`Handling event inside <mysidebar-component>: ${event.detail.linkId}`);
            // Perform your action here
        });
    }
}

customElements.define('mysidebar-component', MySidebarComponent);
