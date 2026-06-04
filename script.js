// Grab the menu elements from the HTML
const menuBtn = document.getElementById('menuBtn');
const sideNav = document.getElementById('sideNav');
const closeBtn = document.getElementById('closeBtn');

// Function to open the menu
function openNav() {
    sideNav.style.width = "250px";
}

// Function to close the menu
function closeNav() {
    sideNav.style.width = "0";
}

// Open the menu when the hamburger icon is clicked or tapped
menuBtn.addEventListener('click', openNav);
menuBtn.addEventListener('touchstart', openNav);

// Close the menu when the 'X' is clicked or tapped
closeBtn.addEventListener('click', closeNav);
closeBtn.addEventListener('touchstart', closeNav);

// Close the menu if the user clicks outside of it
document.addEventListener('click', (event) => {
    if (!sideNav.contains(event.target) && !menuBtn.contains(event.target)) {
        closeNav();
    }
});

// Close the menu if the user taps outside of it (Mobile)
document.addEventListener('touchstart', (event) => {
    if (!sideNav.contains(event.target) && !menuBtn.contains(event.target)) {
        closeNav();
    }
});
