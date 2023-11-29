export default class Tool {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    render() {
        const toolElement = document.createElement('article');
        toolElement.innerHTML = `
            <h3>${this.name}</h3>
            <p>Price: ${this.price}₮</p>
        `;
        return toolElement;
    }

    static async fetchAndRenderTools(target, category) {
        try {
            const response = await fetch('tools.json');

            if (!response.ok) {
                throw new Error(`Failed to fetch tools. Status: ${response.status}`);
            }

            const tools = await response.json();
            const filteredTools = category ? tools.filter(tool => tool.category === category) : tools;

            this.renderTools(filteredTools, target);
        } catch (error) {
            console.error('Error fetching or rendering tools:', error);
        }
    }

    static renderTools(tools, target) {
        const toolsContainer = document.getElementById(target);
        if (!toolsContainer) {
            console.error(`Error: tools container with ID '${target}' not found in the DOM`);
            return;
        }

        // Clear the container before adding new tools
        toolsContainer.innerHTML = '';

        const toolsElements = tools.map(toolData => {
            const toolObj = new Tool(toolData.name, toolData.price, toolData.category);
            return toolObj.render();
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

        if (billiardsLink && racketsLink && glovesLink && ballsLink && closetsLink && accessoriesLink) {
            billiardsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'table');
            });

            racketsLink.addEventListener('click', async () => {
                await this.fetchAndRenderTools('tools-container', 'racket');
            });
            glovesLink.addEventListener('click', async() =>{
                await this.fetchAndRenderTools('tools-container' , 'glove')
            });
            ballsLink.addEventListener('click', async() =>{
                await this.fetchAndRenderTools('tools-container' , 'ball')
            });
            closetsLink.addEventListener('click', async() =>{
                await this.fetchAndRenderTools('tools-container' , 'closet')
            });
            accessoriesLink.addEventListener('click', async() =>{
                await this.fetchAndRenderTools('tools-container' , 'accessories')
            });
        } else {
            console.error('Error: Billiards or Hitters link not found in the DOM');
        }
    }
    
}
Tool.addEventListeners();
// Call the addEventListeners method to set up the click event listener
