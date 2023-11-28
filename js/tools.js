export default class Tools {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

export async function fetchAndRenderTools() {
    try {
        const response = await fetch('tools.json');
        console.log('Response status:', response.status);
        const tools = await response.json();
        const categoryParam = new URLSearchParams(window.location.search).get('category');
        const filteredTools = categoryParam ? tools.filter(tool => tool.category === categoryParam) : tools;
        renderTools(filteredTools);
    } catch (error) {
        console.error('Error fetching or rendering tools:', error);
    }
}

function renderTools(tools) {
    const toolsContainer = document.getElementById('tools-container');
    if (!toolsContainer) {
        console.error("error: tools container not found in the DOM");
        return;
    }
    toolsContainer.innerHTML = '';
    tools.forEach(tool => {  
        const toolElement = document.createElement('div');
        toolElement.innerHTML = `
            <h3>${tool.name}</h3>
            <p>Price: ${tool.price}₮</p>
        `;
        toolsContainer.appendChild(toolElement);
    });
}