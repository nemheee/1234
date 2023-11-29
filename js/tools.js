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
        <a><img src="../img/${this.sub}.png" alt="${this.sub}">
          <p>${this.name}</p>
          <p class="p">${this.sub}</p>
          <p>${this.price}₮</p>
        </a>
        `;
        return toolElement;
    }

    static async fetchAndRenderTools(target, category, billiardContainer) {
        try {
            const response = await fetch('tools.json');

            if (!response.ok) {
                throw new Error(`Failed to fetch tools. Status: ${response.status}`);
            }

            const tools = await response.json();
            const filteredTools = category ? tools.filter(tool => tool.category === category) : tools;

            this.renderTools(filteredTools, target, billiardContainer);
        } catch (error) {
            console.error('Error fetching or rendering tools:', error);
        }
    }

    static renderTools(tools, target, billiardContainer) {
        const toolsContainer = document.getElementById(target);
        if (!toolsContainer) {
            console.error(`Error: tools container with ID '${target}' not found in the DOM`);
            return;
        }

        // Clear the container before adding new tools
        toolsContainer.innerHTML = '';

        const toolsElements = tools.map(toolData => {
            const toolObj = new Tool(toolData.name, toolData.price, toolData.category, toolData.sub);
            return toolObj.render(billiardContainer);
        });

        toolsElements.forEach(toolElement => {
            toolsContainer.appendChild(toolElement);
        });
    }

    static addEventListeners() {
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
// Call the addEventListeners method to set up the click event listener
