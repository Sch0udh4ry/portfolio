const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/mgopzjez';

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    try {
        const payload = normalizePayload(req.body);
        const validationError = validateInquiry(payload);

        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        // Honeypot field: silently accept obvious bot traffic.
        if (payload.company) {
            return res.status(200).json({ message: 'Thanks. We received your request.' });
        }

        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: buildFormspreeBody(payload).toString()
        });

        if (!response.ok) {
            const failure = await response.json().catch(() => ({}));
            const message = failure.errors && failure.errors[0] && failure.errors[0].message
                ? failure.errors[0].message
                : 'We could not deliver your request right now.';

            return res.status(502).json({ message });
        }

        return res.status(200).json({
            message: payload.kind === 'quote'
                ? 'Quote request received. We will review it and get back to you shortly.'
                : 'Message received. We will get back to you shortly.'
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error while sending your request.' });
    }
};

function normalizePayload(body) {
    if (!body) return {};

    if (typeof body === 'string') {
        try {
            return JSON.parse(body);
        } catch (error) {
            return {};
        }
    }

    return body;
}

function validateInquiry(payload) {
    if (!payload.name) return 'Please enter your name.';
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return 'Please enter a valid email address.';
    if (!payload.message) return 'Please add a message so we know how to help.';
    if (payload.kind === 'quote' && (!payload.services_needed || ![].concat(payload.services_needed).filter(Boolean).length)) {
        return 'Please select at least one service for the quote.';
    }

    return null;
}

function buildFormspreeBody(payload) {
    const params = new URLSearchParams();
    const services = Array.isArray(payload.services_needed)
        ? payload.services_needed
        : payload.services_needed
            ? [payload.services_needed]
            : [];

    params.set('_subject', payload.kind === 'quote'
        ? `New quote request from ${payload.name}`
        : `New contact request from ${payload.name}`);
    params.set('submission_type', payload.kind || 'contact');
    params.set('page', payload.page || '');
    params.set('name', payload.name || '');
    params.set('email', payload.email || '');
    params.set('phone', payload.phone || '');
    params.set('social_link', payload.social_link || '');
    params.set('message', payload.message || '');
    params.set('company', payload.company || '');

    services.forEach((service) => {
        params.append('services_needed[]', service);
    });

    return params;
}
