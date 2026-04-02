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
    setupDynamicForms();
    setupTestimonialsCarousel();
    setupPortalLogin();
    setupClientPortal();
    setupPortalLogout();
    setupPortalLogout();

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
    const ratingStars = document.getElementById('review-rating-stars');
    const ratingText = document.getElementById('review-rating-text');

    if (!carousel || !prevButton || !nextButton || !indicators || !quote || !avatar || !name || !role || !tag || !ratingStars || !ratingText) {
        return;
    }

    const defaultReviews = [
        {
            quote: "Pure Reach didn't just automate our ads; they applied human wisdom to AI scale. Our conversion rates tripled because they knew exactly when to let the algorithm run and when to step in.",
            name: "Marcus Thorne",
            role: "CEO, Zenith Tech",
            tag: "Expert-Led Results",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi5yJZ69ncz2PzwZopYlgUUhFoHO7DfsHW-cZQc7FmXba9INu1EQDfoPvMLJRICIcCOvuFdxpdqbjFWW5nVz79E3zDmxHSHv_vtQUQwsggzN8ic6oVKHshPdnUVb2AJgJ4qQVv8EYml2v05Ge6kSYY1xVpfdzvI1DkzqjyT4ERgVx_285ns-cR7QGFerZcoaJaVqzRefPJwGwVXYtIjasLBM3cQGRu5kUsafTClgK9bBBOxSCptXOGNlPeQtuFKybDmpGXyJMkBM",
            rating: 5
        },
        {
            quote: "We came in for technical SEO and left with a clearer content engine, stronger visibility, and a team that actually explains the why behind every move. That's rare.",
            name: "Alina Mercer",
            role: "Growth Director, Northlane Studio",
            tag: "Search Authority",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4A8bzAizFvuIgUes-Btach8vL5gOOEuaTAF4HUKSrXa_5gRPw8-eORzwlU-ZhC6-6d3XUKQQnRyOE9oEVl-5xWg_aHPXvUGr1EQw-ahFo6HdhUHRKChZ-bygw8DmMgji4qhpCDCixFwe5tpRlrc4l54_etECGgkQjq5uhvhrHzTuF5nK6qqQ_yWRH6zBM017jT4q4Sk3yZcQkhGFxCiCNdZhw9mw1peticwHznhxQZrul2Mpp_lPUilspTDofbJrP9Exncb7QTKw8",
            rating: 4.9
        },
        {
            quote: "Their support workflows feel premium because they're designed with empathy first. We improved response quality and consistency without sounding robotic to customers.",
            name: "Priya D'Souza",
            role: "Operations Lead, Care Harbor",
            tag: "Customer Experience",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg_DLByWrnJ8B_1FTtX6dji4Q-79G4Zw_vPM34xeQcFK_o98avaAfDMgrASQDxSvqsEeGPoL7JZ542xxkgji9ITZIh1tiVSmlDA1A2Wo1MYWcjlDUBcG53pn-e9yqZDH5Q68cRaFr0vhpjMR9ZMkMO4U0xRt8F_AcZW9_1_2boCrWYEFQfN6lVYJczQFf5d5WjGR5jk0xl-jT0YP4G3cv2P9V3YxB0uyI2LEzWRcLd_K7poUvhA6ZYI84zQPSuU32IWmJhd820Bts",
            rating: 5
        },
        {
            quote: "Our catalogue operations used to be a bottleneck every week. Pure Reach built a cleaner execution rhythm, caught issues early, and gave our team room to focus on merchandising.",
            name: "Daniel Reeves",
            role: "E-commerce Manager, Atelier Cart",
            tag: "Operational Precision",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrJ84f6rstK44Sj3VXiggghTg29LBcgjGz5xHg73_dCjJLTy_K9KpTndAC-4a176ifuUEvYRIaTcsiKRV6dob1BQe8gc8JC5PEGi07zMnkan2wk9xKhcLvsk9YPwlQI-8WggZN7hQGLw-4GonGpr_S_huVh7yu-kDkRMngAJcjTB0PDl1aU3kbxxaEoWGSiXM-NIBYU6-U00WSxnXXfg980QmKsg15hTc6dv15_QE-9dyE5vb3PGa2zyej9sXUVufHYBIbSSSa5uY",
            rating: 4.8
        }
    ];

    let reviews = defaultReviews;
    let activeIndex = 0;
    let autoAdvanceId = null;
    let indicatorButtons = [];

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
            renderReviewRating(review.rating || 5, ratingStars, ratingText);

            indicatorButtons.forEach((button, buttonIndex) => {
                button.classList.toggle('is-active', buttonIndex === index);
            });

            carousel.classList.remove('is-transitioning');
        }, 140);
    };

    const renderIndicators = () => {
        indicators.innerHTML = '';
        indicatorButtons = reviews.map((review, index) => {
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
    };

    const normalizeReviews = (items) => items
        .filter((item) => item && item.quote && item.name && item.role && item.tag && item.avatar)
        .map((item) => ({
            ...item,
            rating: clampRating(item.rating)
        }));

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

    let touchStartX = 0;

    carousel.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
        const touchDistance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(touchDistance) < 40) return;
        goToRelativeReview(touchDistance > 0 ? -1 : 1);
        restartAutoAdvance();
    }, { passive: true });

    renderIndicators();
    renderReview(activeIndex);
    restartAutoAdvance();

    fetch('/api/reviews')
        .then((response) => response.ok ? response.json() : null)
        .then((payload) => {
            if (!payload || !Array.isArray(payload.reviews) || !payload.reviews.length) return;
            reviews = normalizeReviews(payload.reviews);
            if (!reviews.length) {
                reviews = defaultReviews;
            }
            activeIndex = 0;
            renderIndicators();
            renderReview(activeIndex);
            restartAutoAdvance();
        })
        .catch(() => {
            // Keep the default on-page reviews if the dynamic endpoint is unavailable.
        });
}

function setupDynamicForms() {
    document.querySelectorAll('form[data-dynamic-form]').forEach((form) => {
        const status = form.querySelector('[data-form-status]');
        const submitButton = form.querySelector('button[type="submit"]');
        const submitLabel = submitButton ? submitButton.dataset.submitLabel || submitButton.textContent.trim() : '';
        form.noValidate = true;

        if (submitButton) {
            submitButton.classList.add('form-submit');
        }

        setupLiveValidation(form);

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            form.dataset.submitted = 'true';

            const validation = validateForm(form, true);

            if (!validation.valid) {
                setFormStatus(status, 'error', 'Please fix the highlighted fields and try again.');
                if (validation.firstInvalid) {
                    validation.firstInvalid.focus();
                }
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.classList.add('is-loading');
                submitButton.setAttribute('aria-busy', 'true');
                submitButton.textContent = 'Sending';
            }

            setFormStatus(status, 'pending', 'Submitting your request...');

            try {
                const response = await fetch('/api/inquiry', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        kind: form.dataset.dynamicForm,
                        page: window.location.pathname,
                        ...serializeForm(form)
                    })
                });

                if (response.status === 404 || response.status === 405) {
                    form.submit();
                    return;
                }

                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(result.message || 'Something went wrong while sending your request.');
                }

                form.reset();
                clearFormValidation(form);
                setFormStatus(status, 'success', result.message || 'Thanks. We received your request and will reply soon.');
            } catch (error) {
                if (error instanceof TypeError) {
                    form.submit();
                    return;
                }

                setFormStatus(status, 'error', error.message || 'We could not send your request right now.');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.classList.remove('is-loading');
                    submitButton.removeAttribute('aria-busy');
                    submitButton.textContent = submitLabel;
                }
            }
        });
    });
}

function setupLiveValidation(form) {
    const fields = Array.from(form.querySelectorAll('input[name]:not([type="hidden"]):not([type="checkbox"]), textarea[name]'));

    fields.forEach((field) => {
        field.addEventListener('blur', () => {
            field.dataset.touched = 'true';
            validateNamedField(form, field.name, true);
        });

        field.addEventListener('input', () => {
            if (field.dataset.touched === 'true' || form.dataset.submitted === 'true') {
                validateNamedField(form, field.name, true);
            }
        });
    });

    const serviceInputs = Array.from(form.querySelectorAll('input[name="services_needed[]"]'));
    serviceInputs.forEach((input) => {
        const label = input.closest('label');
        if (label) {
            label.classList.add('service-choice');
        }

        input.addEventListener('change', () => {
            form.dataset.servicesTouched = 'true';
            validateServiceSelection(form, true);
        });
    });
}

function serializeForm(form) {
    const formData = new FormData(form);
    const payload = {};

    formData.forEach((value, rawKey) => {
        const key = rawKey.endsWith('[]') ? rawKey.slice(0, -2) : rawKey;
        const normalizedValue = typeof value === 'string' ? value.trim() : value;

        if (payload[key] === undefined) {
            payload[key] = normalizedValue;
            return;
        }

        if (!Array.isArray(payload[key])) {
            payload[key] = [payload[key]];
        }

        payload[key].push(normalizedValue);
    });

    return payload;
}

function setFormStatus(statusNode, tone, message) {
    if (!statusNode) return;

    statusNode.className = `md:col-span-2 form-status form-status--${tone}`;
    statusNode.textContent = message;
}

function setupPortalLogin() {
    const form = document.querySelector('[data-portal-login]');
    if (!form) return;

    const emailField = form.querySelector('[name="email"]');
    const passwordField = form.querySelector('[name="password"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const statusNode = form.querySelector('[data-login-status]');
    const submitLabel = submitButton ? submitButton.textContent.trim() : '';

    form.noValidate = true;
    if (submitButton) {
        submitButton.classList.add('form-submit');
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailField ? emailField.value.trim() : '';
        const password = passwordField ? passwordField.value.trim() : '';

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setPortalStatus(statusNode, 'error', 'Enter a valid email address to continue.');
            if (emailField) emailField.focus();
            return;
        }

        if (!password || password.length < 6) {
            setPortalStatus(statusNode, 'error', 'Enter your password to continue.');
            if (passwordField) passwordField.focus();
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.add('is-loading');
            submitButton.setAttribute('aria-busy', 'true');
            submitButton.textContent = 'Signing In';
        }

        setPortalStatus(statusNode, 'pending', 'Verifying your account...');

        try {
            const response = await fetch('/api/client-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.message || 'We could not sign you in right now.');
            }

            setPortalStatus(statusNode, 'success', 'Login successful. Opening your client portal...');

            window.setTimeout(() => {
                window.location.href = 'client-portal.html';
            }, 450);
        } catch (error) {
            setPortalStatus(statusNode, 'error', error.message || 'We could not sign you in right now.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('is-loading');
                submitButton.removeAttribute('aria-busy');
                submitButton.textContent = submitLabel;
            }
        }
    });
}

function setupClientPortal() {
    const portalRoot = document.querySelector('[data-client-portal]');
    if (!portalRoot) return;

    const statusNode = document.querySelector('[data-portal-status]');
    setPortalStatus(statusNode, 'pending', 'Loading client account details...');

    fetch('/api/client-portal')
        .then(async (response) => {
            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(payload.message || 'Please log in to view the client portal.');
            }

            return payload;
        })
        .then((payload) => {
            if (!payload || !payload.account) {
                throw new Error('Please log in to view the client portal.');
            }

            renderClientPortal(payload.account);
            setPortalStatus(statusNode, 'success', 'Client account loaded.');
        })
        .catch((error) => {
            setPortalStatus(statusNode, 'error', error.message || 'Please log in to view the client portal.');

            window.setTimeout(() => {
                window.location.href = 'login.html';
            }, 700);
        });
}

function renderClientPortal(account) {
    const fields = {
        companyName: document.getElementById('portal-company-name'),
        contactName: document.getElementById('portal-contact-name'),
        portalEmail: document.getElementById('portal-email'),
        portalStatus: document.getElementById('portal-status-chip'),
        planName: document.getElementById('portal-plan-name'),
        planSummary: document.getElementById('portal-plan-summary'),
        nextPaymentDate: document.getElementById('portal-payment-date'),
        invoiceStatus: document.getElementById('portal-invoice-status'),
        paymentAmount: document.getElementById('portal-payment-amount'),
        supportContact: document.getElementById('portal-support-contact')
    };

    Object.entries(fields).forEach(([key, node]) => {
        if (!node) return;
        const sourceKey = key === 'portalEmail' ? 'email' : key;
        node.textContent = account[sourceKey] || '';
    });

    const paymentLink = document.getElementById('portal-payment-link');
    if (paymentLink && account.paymentLink) {
        paymentLink.href = account.paymentLink;
    }

    const latestInvoice = document.getElementById('portal-latest-invoice');
    if (latestInvoice && account.latestInvoice) {
        latestInvoice.textContent = `${account.latestInvoice.id} | ${account.latestInvoice.amount} | ${account.latestInvoice.status}`;
    }

    const invoicesNode = document.getElementById('portal-invoices');
    if (invoicesNode) {
        invoicesNode.innerHTML = '';

        (account.invoices || []).forEach((invoice) => {
            const row = document.createElement('div');
            row.className = 'grid grid-cols-1 gap-4 rounded-2xl bg-surface-container-low p-6 md:grid-cols-[1.4fr,1fr,0.8fr,auto] md:items-center';
            row.innerHTML = `
                <div>
                    <p class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">${escapeMarkup(invoice.id)}</p>
                    <p class="mt-2 text-lg font-bold text-on-surface">${escapeMarkup(invoice.period)}</p>
                </div>
                <p class="font-semibold text-on-surface">${escapeMarkup(invoice.amount)}</p>
                <p class="text-sm font-bold uppercase tracking-widest ${invoice.status === 'Paid' ? 'text-green-700' : 'text-primary'}">${escapeMarkup(invoice.status)}</p>
                <a class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-primary shadow-sm hover:bg-primary hover:text-white transition-colors" href="${escapeAttribute(invoice.url || '#')}">View Invoice</a>
            `;
            invoicesNode.appendChild(row);
        });
    }

    const servicesNode = document.getElementById('portal-services');
    if (servicesNode) {
        servicesNode.innerHTML = '';

        (account.services || []).forEach((service) => {
            const card = document.createElement('article');
            card.className = 'rounded-3xl bg-surface-container-lowest p-8 shadow-sm';
            card.innerHTML = `
                <div class="mb-6 flex items-center justify-between gap-4">
                    <h3 class="text-2xl font-extrabold text-on-surface">${escapeMarkup(service.name)}</h3>
                    <span class="rounded-full bg-secondary-container px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">${escapeMarkup(service.state)}</span>
                </div>
                <p class="text-on-surface-variant leading-relaxed">${escapeMarkup(service.summary)}</p>
                <div class="mt-6 rounded-2xl bg-surface-container-low p-5">
                    <p class="text-xs font-bold uppercase tracking-widest text-primary">Next Step</p>
                    <p class="mt-3 text-sm font-medium text-on-surface">${escapeMarkup(service.nextStep)}</p>
                </div>
                <div class="mt-6 rounded-2xl border border-dashed border-outline-variant/50 p-5">
                    <p class="text-sm font-semibold text-on-surface">Dashboard preview</p>
                    <p class="mt-2 text-sm text-on-surface-variant">This space can surface campaign charts, SEO progress, content calendars, tickets, or store operations data as the account grows.</p>
                </div>
            `;
            servicesNode.appendChild(card);
        });
    }
}

function setPortalStatus(node, tone, message) {
    if (!node) return;

    node.className = `form-status form-status--${tone}`;
    node.textContent = message;
}

function setupPortalLogout() {
    const button = document.querySelector('[data-portal-logout]');
    if (!button) return;

    const defaultLabel = button.textContent.trim();
    button.classList.add('form-submit');

    button.addEventListener('click', async () => {
        button.disabled = true;
        button.classList.add('is-loading');
        button.textContent = 'Signing Out';

        try {
            await fetch('/api/client-logout', { method: 'POST' });
        } finally {
            button.disabled = false;
            button.classList.remove('is-loading');
            button.textContent = defaultLabel;
            window.location.href = 'login.html';
        }
    });
}

function escapeMarkup(value) {
    return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function escapeAttribute(value) {
    return escapeMarkup(value);
}

function validateForm(form, revealMessages) {
    const trackedNames = Array.from(new Set(
        Array.from(form.querySelectorAll('input[name]:not([type="hidden"]):not([type="checkbox"]), textarea[name]'))
            .map((field) => field.name)
            .filter(Boolean)
    ));

    let firstInvalid = null;
    let valid = true;

    trackedNames.forEach((name) => {
        const result = validateNamedField(form, name, revealMessages);
        if (!result.valid) {
            valid = false;
            if (!firstInvalid) firstInvalid = result.node;
        }
    });

    if (form.querySelector('input[name="services_needed[]"]')) {
        const servicesResult = validateServiceSelection(form, revealMessages);
        if (!servicesResult.valid) {
            valid = false;
            if (!firstInvalid) firstInvalid = servicesResult.node;
        }
    }

    return { valid, firstInvalid };
}

function validateNamedField(form, fieldName, revealMessage) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return { valid: true, node: null };

    const value = field.value.trim();
    let message = '';

    switch (fieldName) {
        case 'name':
            if (!value) {
                message = 'Please enter your name.';
            } else if (value.length < 2) {
                message = 'Use at least 2 characters for your name.';
            }
            break;
        case 'email':
            if (!value) {
                message = 'Please enter your email address.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                message = 'Enter a valid email address.';
            }
            break;
        case 'phone':
            if (value && !/^[0-9+\-\s()]{7,20}$/.test(value)) {
                message = 'Use a valid phone number or leave this blank.';
            }
            break;
        case 'social_link':
            if (value && !isValidHttpUrl(value)) {
                message = 'Add a full link starting with http:// or https://.';
            }
            break;
        case 'message':
            if (!value) {
                message = 'Please tell us a bit about what you need.';
            } else if (value.length < 12) {
                message = 'Add a little more detail so we can respond well.';
            }
            break;
        default:
            if (field.required && !value) {
                message = 'This field is required.';
            }
            break;
    }

    applyFieldValidation(field, revealMessage ? message : '');
    return { valid: !message, node: field };
}

function validateServiceSelection(form, revealMessage) {
    const serviceInputs = Array.from(form.querySelectorAll('input[name="services_needed[]"]'));
    if (!serviceInputs.length) return { valid: true, node: null };

    const valid = serviceInputs.some((input) => input.checked);
    const group = getServiceGroup(form);
    const grid = group ? group.querySelector('.grid') : null;
    const errorNode = group ? ensureFieldError(group, 'services-needed') : null;
    const showMessage = revealMessage || form.dataset.servicesTouched === 'true' || form.dataset.submitted === 'true';
    const message = valid ? '' : 'Pick at least one service so we can scope the quote.';

    if (grid) {
        grid.classList.toggle('is-invalid-group', !!message && showMessage);
        grid.classList.toggle('is-valid-group', valid);
    }

    serviceInputs.forEach((input) => {
        const label = input.closest('label');
        if (label) {
            label.classList.toggle('is-invalid-choice', !!message && showMessage);
            label.classList.toggle('is-valid-choice', valid);
        }
    });

    if (errorNode) {
        errorNode.hidden = !(showMessage && message);
        errorNode.textContent = showMessage ? message : '';
    }

    return { valid, node: serviceInputs[0] };
}

function applyFieldValidation(field, message) {
    const value = field.value.trim();
    const container = getFieldContainer(field);
    const errorNode = ensureFieldError(container, `${field.name}-error`);
    const label = container ? container.querySelector('label') : null;
    const showValid = !message && value.length > 0;

    field.classList.toggle('is-invalid', !!message);
    field.classList.toggle('is-valid', showValid);

    if (container) {
        container.classList.toggle('has-error', !!message);
        container.classList.toggle('has-success', showValid);
    }

    if (label) {
        label.classList.toggle('form-label-error', !!message);
    }

    errorNode.hidden = !message;
    errorNode.textContent = message;
}

function clearFormValidation(form) {
    form.dataset.submitted = 'false';
    form.dataset.servicesTouched = 'false';

    form.querySelectorAll('.is-invalid, .is-valid, .has-error, .has-success, .form-label-error, .is-invalid-choice, .is-valid-choice, .is-invalid-group, .is-valid-group')
        .forEach((node) => {
            node.classList.remove('is-invalid', 'is-valid', 'has-error', 'has-success', 'form-label-error', 'is-invalid-choice', 'is-valid-choice', 'is-invalid-group', 'is-valid-group');
        });

    form.querySelectorAll('.form-field-error').forEach((node) => {
        node.hidden = true;
        node.textContent = '';
    });

    form.querySelectorAll('[data-touched]').forEach((field) => {
        delete field.dataset.touched;
    });
}

function getFieldContainer(field) {
    return field.closest('.flex.flex-col.gap-2') || field.parentElement;
}

function getServiceGroup(form) {
    const serviceInput = form.querySelector('input[name="services_needed[]"]');
    if (!serviceInput) return null;
    const grid = serviceInput.closest('.grid');
    return grid ? grid.parentElement : null;
}

function ensureFieldError(container, key) {
    if (!container) {
        const fallback = document.createElement('p');
        fallback.hidden = true;
        return fallback;
    }

    let node = container.querySelector(`[data-error-for="${key}"]`);

    if (!node) {
        node = document.createElement('p');
        node.className = 'form-field-error';
        node.dataset.errorFor = key;
        node.hidden = true;
        container.appendChild(node);
    }

    return node;
}

function isValidHttpUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
        return false;
    }
}

function renderReviewRating(rating, ratingStars, ratingText) {
    const safeRating = clampRating(rating);
    ratingStars.innerHTML = '';
    ratingStars.setAttribute('aria-label', `Rated ${safeRating} out of 5`);

    for (let index = 1; index <= 5; index += 1) {
        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined review-rating-star';

        if (safeRating >= index) {
            icon.textContent = 'star';
        } else if (safeRating >= index - 0.5) {
            icon.textContent = 'star_half';
        } else {
            icon.textContent = 'star';
            icon.classList.add('is-empty');
        }

        ratingStars.appendChild(icon);
    }

    ratingText.textContent = `Rated ${safeRating.toFixed(1)}/5`;
}

function clampRating(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 5;
    return Math.max(1, Math.min(5, numeric));
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
