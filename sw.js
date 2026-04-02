const CACHE_VERSION = 'pri-v3';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const SHELL_ASSETS = [
    './',
    './index.html',
    './about.html',
    './blog.html',
    './blog-content-google-bing-chatgpt-gemini.html',
    './contact.html',
    './ecommerce.html',
    './faq.html',
    './privacy.html',
    './services.html',
    './support.html',
    './technical-seo-checklist-small-business.html',
    './terms.html',
    './website-redesign-seo-mistakes.html',
    './main.js',
    './tailwind.generated.css',
    './style.css',
    './nav.html',
    './footer.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => !key.startsWith(CACHE_VERSION))
                .map((key) => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    const isSameOrigin = url.origin === self.location.origin;
    const isHtmlNavigation = request.mode === 'navigate';
    const isShellAsset = isSameOrigin && (
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('/nav.html') ||
        url.pathname.endsWith('/footer.html') ||
        url.pathname === '/' ||
        url.pathname.endsWith('/portfolio/')
    );
    const isRemoteMedia = /lh3\.googleusercontent\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.hostname);

    if (isHtmlNavigation || isShellAsset) {
        event.respondWith(staleWhileRevalidate(request, isHtmlNavigation ? SHELL_CACHE : RUNTIME_CACHE));
        return;
    }

    if (isRemoteMedia) {
        event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    }
});

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request, { ignoreSearch: true });

    const networkPromise = fetch(request)
        .then((response) => {
            if (response && (response.ok || response.type === 'opaque')) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cachedResponse);

    return cachedResponse || networkPromise;
}
