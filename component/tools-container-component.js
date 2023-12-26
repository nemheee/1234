class ToolsContainerComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        const toolsData = await Tool.fetchToolsData();
        const categories = [...new Set(toolsData.map(item => item))];
        const container = document.createElement('div');
        container.id = 'tools-container';
        Tool.render(container, categories);

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(container);
    }
}

customElements.define('tools-container', ToolsContainerComponent);
