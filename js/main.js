const hamburger = document.getElementById("hamburger");
const toggless = document.getElementById("toggle");

hamburger.addEventListener("click", function(){
toggless.classList.toggle("active1");    
})
import T, {fetchAndRenderTools }  from './tools.js'
document.addEventListener("DOMContentLoaded", function(){
    fetchAndRenderTools();
});