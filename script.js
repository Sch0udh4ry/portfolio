// Smooth scrolling
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active menu highlight
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

/*Education*/
document.addEventListener("DOMContentLoaded", function () {
    let items = document.querySelectorAll("#education li");

    items.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            let subjectSpan = this.querySelector(".subjects");
            subjectSpan.style.display = "block";
            subjectSpan.style.opacity = "1";
        });

        item.addEventListener("mouseleave", function () {
            let subjectSpan = this.querySelector(".subjects");
            subjectSpan.style.opacity = "0";
            setTimeout(() => {
                subjectSpan.style.display = "none";
            }, 300);
        });
    });
});

/*Greeting*/
document.addEventListener("DOMContentLoaded", function () {
    const greetingElement = document.getElementById("dynamic-greeting");
    const hours = new Date().getHours();
    
    let greeting;
    if (hours < 12) {
        greeting = "Good morning,";
    } else if (hours < 18) {
        greeting = "Good afternoon,";
    } else {
        greeting = "Good evening,";
    }

    greetingElement.textContent = greeting;
});

/*hide nav*/

document.addEventListener("click", function (event) {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Check if the click was outside the navbar and the navbar is expanded
  if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
    if (navbarCollapse.classList.contains("show")) {
      navbarToggler.click(); // Programmatically close the navbar
    }
  }
});

// Typing Test Integration using Typing.com API

const typingTestContainer = document.getElementById('typing-test');
const resultContainer = document.getElementById('typing-result');
const achievementContainer = document.getElementById('typing-achievements');

async function loadTypingTest() {
    try {
        const response = await fetch('https://api.typing.com/v1/typing-test'); // Placeholder API URL
        const data = await response.json();
        displayTest(data);
    } catch (error) {
        console.error('Error loading typing test:', error);
    }
}

function displayTest(testData) {
    typingTestContainer.innerHTML = `<p>${testData.text}</p>`;
    // Additional UI for user input and start button
}

function calculateWPM(charsTyped, timeElapsed) {
    return Math.round((charsTyped / 5) / (timeElapsed / 60));
}

function determineAchievement(wpm) {
    if (wpm >= 101) return 'Master Typer (101+ WPM)';
    if (wpm >= 81) return 'Elite Typist (81-100 WPM)';
    if (wpm >= 61) return 'Advanced Typist (61-80 WPM)';
    if (wpm >= 46) return 'Proficient Typist (46-60 WPM)';
    if (wpm >= 36) return 'Intermediate Typist (36-45 WPM)';
    if (wpm >= 21) return 'Beginner Typist (21-35 WPM)';
    return 'Novice Typist (1-20 WPM)';
}

function saveAchievement(wpm) {
    const achievement = determineAchievement(wpm);
    localStorage.setItem('typingAchievement', achievement);
    achievementContainer.innerHTML = `<p>Your achievement: ${achievement}</p>`;
}

// Load test when the user clicks "Start Test"
document.getElementById('start-test-btn').addEventListener('click', loadTypingTest);
