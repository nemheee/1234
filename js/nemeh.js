document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-link');
  
    categoryLinks.forEach((link) => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
  
        const categoryName = link.getAttribute('id').replace('-link', ''); // Extract category name from link ID
        const tools = await fetchToolsByCategory(categoryName);
  
        // Update the HTML content with the fetched tools
        updateToolList(tools);
      });
    });
  
    // Fetch tools from the server based on the selected category
    async function fetchToolsByCategory(category) {
      const response = await fetch(`/tools/?category=${category}`);
      const tools = await response.json();
      return tools;
    }
  
    // Update the HTML content with the fetched tools
    function updateToolList(tools) {
      // Assuming you have a container with id "billiard-container" for displaying tools
      const container = document.getElementById('billiard-container');
  
      // Clear the existing content
      container.innerHTML = '';
  
      // Update the container with the new tools
      tools.forEach((tool) => {
        const toolElement = createToolElement(tool);
        container.appendChild(toolElement);
      });
    }
  
    // Create HTML element for a tool
    function createToolElement(tool) {
      // You can customize this based on your tool structure
      const toolElement = document.createElement('div');
      toolElement.innerHTML = `
        <a href="./tools.html">
          <img src="${tool.image}" alt="${tool.name}">
          <br>
          <p>${tool.category}</p>
          <p class="p">${tool.brand}</p>
          <p>${tool.price}₮</p>
        </a>
      `;
  
      return toolElement;
    }
  });
  