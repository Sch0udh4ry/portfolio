/**
 * PURE REACH INNOVATION - GLOBAL ENGINE
 * Fully Integrated Production Version
 */

function initSite() {
    // Initialize page interactions immediately so component fetches do not block UX.
    registerServiceWorker();
    optimizeImageLoading();
    setupGlobalCTAs();
    setupScrollAnimations();
    setupCountUpAnimations();
    setupLinkPrefetching();
    loadSharedComponents();

    // FAILSAFE: If animations don't trigger, show everything after 1.5 seconds
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 1500);
}

async function loadSharedComponents() {
    const components = [
        { id: 'navbar-placeholder', file: 'nav.html' },
        { id: 'footer-placeholder', file: 'footer.html' }
    ];

    const componentTasks = components.map(async (comp) => {
        const placeholder = document.getElementById(comp.id);
        if (!placeholder) return;

        const cacheKey = `shared-component:${comp.file}`;
        const cachedMarkup = getSessionCache(cacheKey);

        if (cachedMarkup) {
            placeholder.innerHTML = cachedMarkup;
        }

        try {
            const markup = await fetchComponentMarkup(comp.file);
            if (markup) {
                placeholder.innerHTML = markup;
                setSessionCache(cacheKey, markup);
            }
        } catch (err) {
            console.error(`Component load failed for ${comp.file}`, err);
        }
    });

    await Promise.all(componentTasks);
    setupNavbar();
    setupGlobalCTAs();
}

async function fetchComponentMarkup(file) {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller
        ? window.setTimeout(() => controller.abort(), 2500)
        : null;

    try {
        const response = await fetch(file, controller ? { signal: controller.signal } : undefined);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
    } finally {
        if (timeoutId) window.clearTimeout(timeoutId);
    }
}

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (window.location.protocol === 'file:') return;

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch((err) => {
            console.error('Service worker registration failed', err);
        });
    }, { once: true });
}

function optimizeImageLoading() {
    const images = document.querySelectorAll('img');
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    images.forEach((image, index) => {
        if (!image.hasAttribute('decoding')) {
            image.decoding = 'async';
        }

        const rect = image.getBoundingClientRect();
        const nearViewport = rect.top <= viewportHeight * 1.1 && rect.bottom >= -viewportHeight * 0.1;
        const isPriorityImage = nearViewport && index < 2;

        if (isPriorityImage) {
            image.loading = 'eager';
            image.fetchPriority = image.fetchPriority || 'high';
            return;
        }

        if (!image.hasAttribute('loading')) {
            image.loading = 'lazy';
        }

        if (!image.hasAttribute('fetchpriority')) {
            image.fetchPriority = 'low';
        }
    });
}

function setupLinkPrefetching() {
    const prefetchedUrls = new Set();
    const prefersReducedData = navigator.connection && navigator.connection.saveData;

    if (prefersReducedData) return;

    const prefetchLink = (href) => {
        if (!href) return;

        let url;
        try {
            url = new URL(href, window.location.href);
        } catch (err) {
            return;
        }

        if (url.origin !== window.location.origin) return;
        if (!url.pathname.endsWith('.html')) return;
        if (url.pathname === window.location.pathname && !url.hash) return;

        const cacheKey = url.href;
        if (prefetchedUrls.has(cacheKey)) return;
        prefetchedUrls.add(cacheKey);

        const prefetchTag = document.createElement('link');
        prefetchTag.rel = 'prefetch';
        prefetchTag.as = 'document';
        prefetchTag.href = cacheKey;
        document.head.appendChild(prefetchTag);
    };

    const getAnchorFromEvent = (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return null;
        return target.closest('a[href]');
    };

    const maybePrefetchFromAnchor = (anchor) => {
        if (!anchor) return;
        if (anchor.target && anchor.target !== '_self') return;
        if (anchor.hasAttribute('download')) return;
        prefetchLink(anchor.getAttribute('href'));
    };

    document.addEventListener('mouseover', (event) => {
        maybePrefetchFromAnchor(getAnchorFromEvent(event));
    }, { passive: true });

    document.addEventListener('focusin', (event) => {
        maybePrefetchFromAnchor(getAnchorFromEvent(event));
    });

    document.addEventListener('touchstart', (event) => {
        maybePrefetchFromAnchor(getAnchorFromEvent(event));
    }, { passive: true });

    const warmLikelyNextPages = () => {
        document.querySelectorAll('a[href]').forEach((anchor) => {
            if (anchor.closest('nav, footer') || anchor.classList.contains('nav-link')) {
                maybePrefetchFromAnchor(anchor);
            }
        });
    };

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(warmLikelyNextPages, { timeout: 1200 });
    } else {
        window.setTimeout(warmLikelyNextPages, 800);
    }
}

function getSessionCache(key) {
    try {
        return window.sessionStorage.getItem(key);
    } catch (err) {
        return null;
    }
}

function setSessionCache(key, value) {
    try {
        window.sessionStorage.setItem(key, value);
    } catch (err) {
        // Ignore storage write failures and continue with fresh markup.
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

function setupCountUpAnimations() {
    const countUpElements = document.querySelectorAll("[data-countup]");

    if (!countUpElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    countUpElements.forEach((element) => {
        element.dataset.countupOriginal = element.textContent.trim();
    });

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
        countUpElements.forEach((element) => {
            element.textContent = element.dataset.countupOriginal;
        });
        return;
    }

    const isElementNearViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        return rect.bottom >= 0 && rect.top <= viewportHeight * 0.92;
    };

    const checkCountUpsInView = () => {
        countUpElements.forEach((element) => {
            if (element.dataset.countupAnimated === 'true') return;
            if (isElementNearViewport(element)) animateCountUp(element);
        });
    };

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            animateCountUp(entry.target);
            countObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0,
        rootMargin: '0px 0px -8% 0px'
    });

    countUpElements.forEach((element) => {
        countObserver.observe(element);
    });

    window.addEventListener('load', checkCountUpsInView, { once: true });
    window.addEventListener('resize', checkCountUpsInView, { passive: true });
    window.addEventListener('scroll', checkCountUpsInView, { passive: true });

    requestAnimationFrame(checkCountUpsInView);
    window.setTimeout(checkCountUpsInView, 250);
}

function animateCountUp(element) {
    if (element.dataset.countupAnimated === 'true') return;

    const originalText = element.dataset.countupOriginal || element.textContent.trim();
    const match = originalText.match(/-?\d[\d,]*(?:\.\d+)?/);

    if (!match) {
        element.dataset.countupAnimated = 'true';
        return;
    }

    const numberText = match[0];
    const targetValue = Number(numberText.replace(/,/g, ''));
    const decimalPlaces = (numberText.split('.')[1] || '').length;
    const prefix = originalText.slice(0, match.index);
    const suffix = originalText.slice((match.index || 0) + numberText.length);
    const duration = Number(element.dataset.countupDuration || 1400);
    const startTime = performance.now();

    const renderValue = (value) => {
        const formattedValue = value.toLocaleString(undefined, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        });

        element.textContent = `${prefix}${formattedValue}${suffix}`;
    };

    const tick = (currentTime) => {
        const elapsed = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - elapsed, 3);
        const currentValue = targetValue * easedProgress;

        renderValue(elapsed < 1 ? currentValue : targetValue);

        if (elapsed < 1) {
            requestAnimationFrame(tick);
            return;
        }

        element.dataset.countupAnimated = 'true';
    };

    renderValue(0);
    requestAnimationFrame(tick);
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
