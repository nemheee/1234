
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}
document.addEventListener('DOMContentLoaded', function() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');
    const toggle = document.getElementById('toggle');
    const links = toggle.querySelectorAll('a');

    function applyDarkMode() {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        toggle.style.backgroundColor = '#222'; 
        links.forEach(link => {
            link.style.color = '#fff';
            link.style.backgroundColor = '#2c2c2c'; 
        });
    }

    function applyLightMode() {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        toggle.style.backgroundColor = '#fff'; 
        links.forEach(link => {
            link.style.color = '#fff'; 
            link.style.backgroundColor = 'b5aeae';
        });
    }

    function applySystemColorScheme() {
        if (darkModeQuery.matches) {
            applyDarkMode();
        } else if (lightModeQuery.matches) {
            applyLightMode();
        }
    }

    // Initial setup based on system color scheme
    applySystemColorScheme();

    // Listen for changes in system color scheme
    darkModeQuery.addListener(applySystemColorScheme);
    lightModeQuery.addListener(applySystemColorScheme);
});
