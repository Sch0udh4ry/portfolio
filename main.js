/**
 * PURE REACH INNOVATION - GLOBAL ENGINE
 * Fully Integrated Production Version
 */

async function initSite() {
    const v = new Date().getTime(); 
    const components = [
        { id: 'navbar-placeholder', file: `nav.html?v=${v}` },
        { id: 'footer-placeholder', file: `footer.html?v=${v}` }
    ];

    for (const comp of components) {
        const placeholder = document.getElementById(comp.id);
        if (!placeholder) continue;
        try {
            const response = await fetch(comp.file);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            placeholder.innerHTML = await response.text();
        } catch (err) {
            console.error(`Primary load failed for ${comp.file}, trying backup...`, err);
            try {
                const backupRes = await fetch(comp.file.split('?')[0]);
                if (backupRes.ok) placeholder.innerHTML = await backupRes.text();
            } catch (backupErr) {
                console.error("Backup load failed:", backupErr);
            }
        }
    }

    // Initialize all logic
    setupNavbar();
    setupGlobalCTAs();
    setupScrollAnimations();
    setupTestimonialsCarousel();

    // FAILSAFE: If animations don't trigger, show everything after 1.5 seconds
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 1500);
}

function setupNavbar() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.onclick = (e) => {
            e.preventDefault();
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('.material-symbols-outlined');
            if(icon) icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
        };
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('text-blue-600', 'font-bold', 'border-b-2', 'border-blue-600', 'pb-1');
            link.classList.remove('text-slate-600', 'font-medium');
        }
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function setupTestimonialsCarousel() {
    const carousel = document.getElementById('reviews-carousel');
    const prevButton = document.getElementById('reviews-prev');
    const nextButton = document.getElementById('reviews-next');
    const indicators = document.getElementById('reviews-indicators');
    const quote = document.getElementById('review-quote');
    const avatar = document.getElementById('review-avatar');
    const name = document.getElementById('review-name');
    const role = document.getElementById('review-role');
    const tag = document.getElementById('review-tag');

    if (!carousel || !prevButton || !nextButton || !indicators || !quote || !avatar || !name || !role || !tag) {
        return;
    }

    const reviews = [
        {
            quote: "Pure Reach didn't just automate our ads; they applied human wisdom to AI scale. Our conversion rates tripled because they knew exactly when to let the algorithm run and when to step in.",
            name: "Marcus Thorne",
            role: "CEO, Zenith Tech",
            tag: "Expert-Led Results",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi5yJZ69ncz2PzwZopYlgUUhFoHO7DfsHW-cZQc7FmXba9INu1EQDfoPvMLJRICIcCOvuFdxpdqbjFWW5nVz79E3zDmxHSHv_vtQUQwsggzN8ic6oVKHshPdnUVb2AJgJ4qQVv8EYml2v05Ge6kSYY1xVpfdzvI1DkzqjyT4ERgVx_285ns-cR7QGFerZcoaJaVqzRefPJwGwVXYtIjasLBM3cQGRu5kUsafTClgK9bBBOxSCptXOGNlPeQtuFKybDmpGXyJMkBM"
        },
        {
            quote: "We came in for technical SEO and left with a clearer content engine, stronger visibility, and a team that actually explains the why behind every move. That's rare.",
            name: "Alina Mercer",
            role: "Growth Director, Northlane Studio",
            tag: "Search Authority",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4A8bzAizFvuIgUes-Btach8vL5gOOEuaTAF4HUKSrXa_5gRPw8-eORzwlU-ZhC6-6d3XUKQQnRyOE9oEVl-5xWg_aHPXvUGr1EQw-ahFo6HdhUHRKChZ-bygw8DmMgji4qhpCDCixFwe5tpRlrc4l54_etECGgkQjq5uhvhrHzTuF5nK6qqQ_yWRH6zBM017jT4q4Sk3yZcQkhGFxCiCNdZhw9mw1peticwHznhxQZrul2Mpp_lPUilspTDofbJrP9Exncb7QTKw8"
        },
        {
            quote: "Their support workflows feel premium because they're designed with empathy first. We improved response quality and consistency without sounding robotic to customers.",
            name: "Priya D'Souza",
            role: "Operations Lead, Care Harbor",
            tag: "Customer Experience",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg_DLByWrnJ8B_1FTtX6dji4Q-79G4Zw_vPM34xeQcFK_o98avaAfDMgrASQDxSvqsEeGPoL7JZ542xxkgji9ITZIh1tiVSmlDA1A2Wo1MYWcjlDUBcG53pn-e9yqZDH5Q68cRaFr0vhpjMR9ZMkMO4U0xRt8F_AcZW9_1_2boCrWYEFQfN6lVYJczQFf5d5WjGR5jk0xl-jT0YP4G3cv2P9V3YxB0uyI2LEzWRcLd_K7poUvhA6ZYI84zQPSuU32IWmJhd820Bts"
        },
        {
            quote: "Our catalogue operations used to be a bottleneck every week. Pure Reach built a cleaner execution rhythm, caught issues early, and gave our team room to focus on merchandising.",
            name: "Daniel Reeves",
            role: "E-commerce Manager, Atelier Cart",
            tag: "Operational Precision",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrJ84f6rstK44Sj3VXiggghTg29LBcgjGz5xHg73_dCjJLTy_K9KpTndAC-4a176ifuUEvYRIaTcsiKRV6dob1BQe8gc8JC5PEGi07zMnkan2wk9xKhcLvsk9YPwlQI-8WggZN7hQGLw-4GonGpr_S_huVh7yu-kDkRMngAJcjTB0PDl1aU3kbxxaEoWGSiXM-NIBYU6-U00WSxnXXfg980QmKsg15hTc6dv15_QE-9dyE5vb3PGa2zyej9sXUVufHYBIbSSSa5uY"
        }
    ];

    let activeIndex = 0;
    let autoAdvanceId = null;

    const indicatorButtons = reviews.map((review, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'review-indicator';
        button.setAttribute('aria-label', `Show review ${index + 1}`);
        button.onclick = () => {
            renderReview(index);
            restartAutoAdvance();
        };
        indicators.appendChild(button);
        return button;
    });

    const renderReview = (index) => {
        const review = reviews[index];
        activeIndex = index;

        carousel.classList.add('is-transitioning');

        window.setTimeout(() => {
            quote.textContent = `"${review.quote}"`;
            avatar.src = review.avatar;
            avatar.alt = `${review.name} portrait`;
            name.textContent = review.name;
            role.textContent = review.role;
            tag.textContent = review.tag;

            indicatorButtons.forEach((button, buttonIndex) => {
                button.classList.toggle('is-active', buttonIndex === index);
            });

            carousel.classList.remove('is-transitioning');
        }, 140);
    };

    const goToRelativeReview = (direction) => {
        const nextIndex = (activeIndex + direction + reviews.length) % reviews.length;
        renderReview(nextIndex);
    };

    const restartAutoAdvance = () => {
        if (autoAdvanceId) {
            window.clearInterval(autoAdvanceId);
        }

        autoAdvanceId = window.setInterval(() => {
            goToRelativeReview(1);
        }, 5000);
    };

    prevButton.onclick = () => {
        goToRelativeReview(-1);
        restartAutoAdvance();
    };

    nextButton.onclick = () => {
        goToRelativeReview(1);
        restartAutoAdvance();
    };

    carousel.addEventListener('mouseenter', () => {
        if (autoAdvanceId) window.clearInterval(autoAdvanceId);
    });

    carousel.addEventListener('mouseleave', restartAutoAdvance);
    carousel.addEventListener('focusin', () => {
        if (autoAdvanceId) window.clearInterval(autoAdvanceId);
    });
    carousel.addEventListener('focusout', restartAutoAdvance);

    renderReview(activeIndex);
    restartAutoAdvance();
}

function setupGlobalCTAs() {
    document.querySelectorAll('button, a').forEach(btn => {
        const text = btn.innerText.toLowerCase();
        let target = "";

        if (
            text.includes('get started') ||
            text.includes('book a') ||
            text.includes('start project') ||
            text.includes('accelerate growth') ||
            text.includes('scale with experts') ||
            text.includes('strategy session') ||
            text.includes('talk to operations') ||
            text.includes('initialize setup')
        ) {
            target = 'contact.html';
        } else if (
            text.includes('explore solutions') ||
            text.includes('view capabilities')
        ) {
            target = 'services.html';
        } else if (text.includes('view demo')) {
            target = 'support.html';
        }

        if (target && (btn.tagName === 'BUTTON' || btn.getAttribute('href') === '#' || btn.getAttribute('href') === '')) {
            btn.onclick = (e) => {
                e.preventDefault();
                window.location.href = target;
            };
        }
    });
}

// Start the engine when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
} else {
    initSite();
}
