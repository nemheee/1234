// tools.js

export default class Tool {
    constructor(name, price, category, sub) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.sub = sub;
    }

    render(billiardContainer) {
        billiardContainer.innerHTML = '';
        const toolElement = document.createElement('article');
        toolElement.innerHTML = `
        <a><img src="/${this.sub}.png" alt="${this.sub}">
          <p>${this.name}</p>
          <p class="p">${this.sub}</p>
          <p>${this.price}₮</p>
        </a>
        `;
        return toolElement;
    }

    static async fetchAndRenderTools(target, category, billiardContainer) {
        try {
            category = category || '';

            const queryParams = new URLSearchParams();
            if (category) {
                queryParams.append('category', category);
            }

            const response = await fetch(`tools.json?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch tools. Status: ${response.status}`);
            }

            const tools = await response.json();

            const filteredTools = category ? tools.filter(tool => tool.category === category) : tools;

            this.renderTools(filteredTools, target, billiardContainer, category);

            const searchParams = new URLSearchParams(window.location.search);
            if (category) {
                searchParams.set('category', category);
            } else {
                searchParams.delete('category');
            }

            // window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
            const path = category ? `/${category}` : '/tools';
      window.history.replaceState({}, '', path);
        } catch (error) {
            console.error('Error fetching or rendering tools:', error);
        }
    }

    static renderTools(tools, target, billiardContainer, category) {
        const toolsContainer = document.getElementById(target);
        if (!toolsContainer) {
            console.error(`Error: tools container with ID '${target}' not found in the DOM`);
            return;
        }

        toolsContainer.innerHTML = '';

        const filteredTools = category ? tools.filter(tool => tool.category === category) : tools;

        const toolsElements = filteredTools.map(toolData => {
            const toolObj = new Tool(toolData.name, toolData.price, toolData.category, toolData.sub);
            return toolObj.render(billiardContainer);
        });

        toolsElements.forEach(toolElement => {
            toolsContainer.appendChild(toolElement);
        });
    }

    static addEventListeners() {
        const overlayLinks = document.querySelectorAll('.overlay-content');
        const billiardContainer = document.getElementById('billiard-container');
        const allContainer = document.getElementById('all');
        const billiardsLink = document.getElementById('billiard-link');const racketsLink = document.getElementById('racket-link');
        const glovesLink = document.getElementById('glove-link');
        const ballsLink = document.getElementById('ball-link');
        const closetsLink = document.getElementById('closet-link');
        const accessoriesLink = document.getElementById('accessories-link');

        if (allContainer && overlayLinks.length > 0 && billiardContainer && billiardsLink && glovesLink && ballsLink && closetsLink && accessoriesLink) {
            overlayLinks.forEach(link => {
                link.addEventListener('click', async (event) => {
                    event.preventDefault();
            
                    const hrefAttribute = link.getAttribute('href');
            
                    if (hrefAttribute !== null && hrefAttribute !== undefined) {
                        const toolName = hrefAttribute.replace('/tools/', '');
            
                        await fetch(`http://localhost:3000/tools/${toolName}`)
                            .then(response => response.json())
                            .then(tool => {
                                Tool.renderTools([tool], 'tools-container', billiardContainer, tool.category);
                            })
                            .catch(error => console.error('Error fetching tool:', error));
                    } else {
                        console.error("'href' attribute is null or undefined");
                    }
                });
            });
            


            allContainer.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', '', billiardContainer);
            });

            billiardsLink.addEventListener('click', async () => {
                console.log("nemheeee");
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
