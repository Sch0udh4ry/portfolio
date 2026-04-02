const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/mgopzjez';
const RESEND_API_URL = 'https://api.resend.com/emails';

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

        const deliveryResult = await deliverInquiry(payload);

        if (!deliveryResult.ok) {
            return res.status(502).json({ message: deliveryResult.message });
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

async function deliverInquiry(payload) {
    if (hasResendConfig()) {
        const resendResult = await sendWithResend(payload);
        if (resendResult.ok) {
            return resendResult;
        }
    }

    return sendWithFormspree(payload);
}

function hasResendConfig() {
    return Boolean(
        process.env.RESEND_API_KEY &&
        process.env.RESEND_FROM_EMAIL &&
        process.env.INQUIRY_TO_EMAIL
    );
}

async function sendWithResend(payload) {
    const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL,
            to: [process.env.INQUIRY_TO_EMAIL],
            reply_to: payload.email,
            subject: payload.kind === 'quote'
                ? `New quote request from ${payload.name}`
                : `New contact request from ${payload.name}`,
            html: buildEmailHtml(payload),
            text: buildEmailText(payload)
        })
    });

    if (!response.ok) {
        const failure = await response.json().catch(() => ({}));
        return {
            ok: false,
            message: extractEmailError(failure) || 'Email delivery failed.'
        };
    }

    return { ok: true };
}

async function sendWithFormspree(payload) {
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
        return {
            ok: false,
            message: extractEmailError(failure) || 'We could not deliver your request right now.'
        };
    }

    return { ok: true };
}

function extractEmailError(failure) {
    if (!failure) return null;
    if (failure.message) return failure.message;
    if (failure.name && failure.name.message) return failure.name.message;
    if (failure.errors && failure.errors[0] && failure.errors[0].message) return failure.errors[0].message;
    return null;
}

function buildEmailHtml(payload) {
    const services = Array.isArray(payload.services_needed)
        ? payload.services_needed
        : payload.services_needed
            ? [payload.services_needed]
            : [];

    const serviceMarkup = services.length
        ? `<ul>${services.map((service) => `<li>${escapeHtml(service)}</li>`).join('')}</ul>`
        : '<p>No services selected.</p>';

    return `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;">
            <h2 style="margin-bottom:8px;">${payload.kind === 'quote' ? 'New Quote Request' : 'New Contact Request'}</h2>
            <p style="margin-top:0;color:#6b7280;">Submitted from ${escapeHtml(payload.page || 'unknown page')}</p>
            <table style="border-collapse:collapse;width:100%;max-width:720px;">
                <tr><td style="padding:8px 0;font-weight:700;">Name</td><td style="padding:8px 0;">${escapeHtml(payload.name || '')}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;">Email</td><td style="padding:8px 0;">${escapeHtml(payload.email || '')}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;">Phone</td><td style="padding:8px 0;">${escapeHtml(payload.phone || '') || 'Not provided'}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;">Website / Social</td><td style="padding:8px 0;">${escapeHtml(payload.social_link || '') || 'Not provided'}</td></tr>
            </table>
            ${payload.kind === 'quote' ? `<h3 style="margin-top:24px;">Services Needed</h3>${serviceMarkup}` : ''}
            <h3 style="margin-top:24px;">Message</h3>
            <p style="white-space:pre-line;">${escapeHtml(payload.message || '')}</p>
        </div>
    `;
}

function buildEmailText(payload) {
    const services = Array.isArray(payload.services_needed)
        ? payload.services_needed
        : payload.services_needed
            ? [payload.services_needed]
            : [];

    return [
        payload.kind === 'quote' ? 'New Quote Request' : 'New Contact Request',
        `Page: ${payload.page || 'unknown page'}`,
        `Name: ${payload.name || ''}`,
        `Email: ${payload.email || ''}`,
        `Phone: ${payload.phone || 'Not provided'}`,
        `Website / Social: ${payload.social_link || 'Not provided'}`,
        services.length ? `Services Needed: ${services.join(', ')}` : '',
        '',
        'Message:',
        payload.message || ''
    ].filter(Boolean).join('\n');
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}
