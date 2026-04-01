/**
 * PURE REACH INNOVATION - GLOBAL ENGINE
 * Optimized for live server deployment
 */

async function initSite() {
    try {
        // Use absolute paths to prevent 404s on sub-pages
        const [navRes, footRes] = await Promise.all([
            fetch('/components/nav.html'),
            fetch('/components/footer.html')
        ]);
        
        if (!navRes.ok || !footRes.ok) throw new Error("Component fetch failed");

        document.getElementById('navbar-placeholder').innerHTML = await navRes.text();
        document.getElementById('footer-placeholder').innerHTML = await footRes.text();

        // Initialize logic after components are in the DOM
        setupNavbar();
        setupGlobalCTAs();
        
        // Small delay to ensure browser paints middle sections before observing
        setTimeout(() => {
            setupScrollAnimations();
        }, 100);

    } catch (err) {
        console.error("Component load error:", err);
        // Fallback: If animations fail, show all content immediately
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }
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

    // Highlight active link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('text-blue-600', 'font-bold', 'border-b-2', 'border-blue-600', 'pb-1');
            link.classList.remove('text-slate-600', 'font-medium');
        }
    });
}

function setupScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Stop watching once visible
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll(".reveal");
    if (targets.length === 0) {
        console.warn("No .reveal elements found yet.");
    }
    targets.forEach((el) => observer.observe(el));
}

function setupGlobalCTAs() {
    const ctaButtons = document.querySelectorAll('button, a');
    ctaButtons.forEach(btn => {
        const text = btn.innerText.toLowerCase();
        if (text.includes('get started') || text.includes('book a') || text.includes('start project') || text.includes('message now')) {
            // Only apply if it's a button without a specific link
            if (btn.tagName === 'BUTTON' || btn.getAttribute('href') === '#') {
                btn.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = '/contact.html'; 
                };
            }
            btn.classList.add('cursor-pointer', 'active:scale-95', 'transition-transform');
        }
    });
}

// Run the engine
document.addEventListener('DOMContentLoaded', initSite);