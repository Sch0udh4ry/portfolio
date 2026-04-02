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
