// import "./tool"
class ToolsContainerComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        try {
            const toolsData = await Tool.fetchToolsData();
            const categories = [...new Set(toolsData.map(item => item))];
            
            const container = document.createElement('div');
            container.id = 'tools-container';

            Tool.render(container, categories);

            container.style.display = 'grid';
            container.style.gridTemplateColumns = 'auto auto';
            container.style.gap = "1rem"
            container.style.padding = "1rem"

            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(container);
        } catch (error) {
            console.error('Error rendering tools:', error);
        }
    }
}

customElements.define('tools-container', ToolsContainerComponent);
