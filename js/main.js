const hamburger = document.getElementById("hamburger");
const toggless = document.getElementById("toggle");

hamburger.addEventListener("click", function(){
toggless.classList.toggle("active1");    
})

import Tool from './tools.js';

// Tool.fetchAndRenderTools('tools-container');
Tool.addEventListeners();
