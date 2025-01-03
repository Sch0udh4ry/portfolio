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

document.addEventListener("DOMContentLoaded", function() {
    let items = document.querySelectorAll("#education li");

    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY + window.innerHeight;

        items.forEach((item) => {
            let itemPosition = item.offsetTop;
            if (scrollPosition > itemPosition) {
                item.style.opacity = 1;
                item.style.transform = "translateY(0)";
            }
        });
    });

    items.forEach((item) => {
        item.style.opacity = 0;
        item.style.transform = "translateY(30px)";
        item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });
});

