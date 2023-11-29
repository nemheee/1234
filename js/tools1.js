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

    static async fetchAndRenderTools(target) {
        try {
            const response = await fetch('tools.json');

            if (!response.ok) {
                throw new Error(`Failed to fetch tools. Status: ${response.status}`);
            }

            const tools = await response.json();
            const categoryParam = new URLSearchParams(window.location.search).get('category');
            const filteredTools = categoryParam ? tools.filter(tool => tool.category === categoryParam) : tools;

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

        if (billiardsLink) {
            billiardsLink.addEventListener('click', async () => {
                console.log("bnu");
                await this.fetchAndRenderTools('billiard-container'); // Replace 'your-target-container-id' with the actual ID of your target container
            });
        } else {
            console.error('Error: Billiards link not found in the DOM');
        }
    }
}

