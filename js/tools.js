export default class Tool {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    async fetchAndRenderTools(target) {
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

    renderTools(tools, target) {
        const toolsContainer = document.getElementById(target);

        if (!toolsContainer) {
            console.error("Error: tools container not found in the DOM");
            return;
        }

        toolsContainer.innerHTML = '';
        tools.forEach(tool => {
            const toolElement = document.createElement('article');
            toolElement.innerHTML = `
                <h3>${tool.name}</h3>
                <p>Price: ${tool.price}₮</p>
            `;
            toolsContainer.appendChild(toolElement);
        });
    }
}
