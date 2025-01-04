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


