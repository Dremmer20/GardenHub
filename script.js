// Grab the menu elements from the HTML
const menuBtn = document.getElementById('menuBtn');
const sideNav = document.getElementById('sideNav');
const closeBtn = document.getElementById('closeBtn');

// Open the menu when the hamburger icon is clicked
menuBtn.addEventListener('click', () => {
    sideNav.style.width = "250px";
});

// Close the menu when the 'X' is clicked
closeBtn.addEventListener('click', () => {
    sideNav.style.width = "0";
});

// Close the menu if the user clicks outside of it
document.addEventListener('click', (event) => {
    if (!sideNav.contains(event.target) && !menuBtn.contains(event.target)) {
        sideNav.style.width = "0";
    }
});
