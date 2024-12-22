// Function to determine the appropriate greeting with emojis
function updateGreeting() {
    const currentHour = new Date().getHours();
    let greeting, emoji;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good Morning";
        emoji = "🌅"; // Sunrise
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good Afternoon";
        emoji = "☀️"; // Sun
    } else if (currentHour >= 18 && currentHour < 22) {
        greeting = "Good Evening";
        emoji = "🌇"; // Sunset
    } else {
        greeting = "Good Night";
        emoji = "🌙"; // Moon
    }

    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        greetingElement.textContent = `${emoji} ${greeting}`;
    }
}

// Update footer year dynamically
function updateYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

// Call functions after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    updateGreeting();
    updateYear();
});

// Gallery auto-scroll functionality
let autoScrollInterval;
const gallery = document.querySelector('.gallery-grid');
const scrollAmount = gallery.clientWidth / 3; // Scroll by one-third the width of the container

function scrollGallery(direction) {
    gallery.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    resetAutoScroll();
}

function autoScroll() {
    scrollGallery(1);
}

function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(autoScroll, 3000); // Auto-scroll every 3 seconds
}

// Start the auto-scroll functionality
resetAutoScroll();

// Reset the auto-scroll timer when user interacts
gallery.addEventListener('mouseover', () => clearInterval(autoScrollInterval));
gallery.addEventListener('mouseout', resetAutoScroll);
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000, // Animation duration in ms
    once: true,     // Run animation only once
  });
});



