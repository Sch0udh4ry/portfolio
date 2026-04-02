const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const SESSION_COOKIE_NAME = 'pri_client_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;
const ACCOUNTS_FILE = path.join(process.cwd(), 'data', 'client-accounts.json');

function readAccounts() {
    return JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'));
}

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function findAccountByEmail(email) {
    const target = normalizeEmail(email);
    return readAccounts().find((account) => normalizeEmail(account.email) === target) || null;
}

function verifyPassword(password, account) {
    if (!account || !password) return false;

    const derived = crypto.scryptSync(String(password), account.password_salt, 64);
    const expected = Buffer.from(account.password_hash, 'hex');

    if (derived.length !== expected.length) {
        return false;
    }

    return crypto.timingSafeEqual(derived, expected);
}

function createSessionToken(account) {
    const payload = {
        accountId: account.id,
        email: normalizeEmail(account.email),
        exp: Date.now() + (SESSION_DURATION_SECONDS * 1000)
    };

    const encodedPayload = toBase64Url(JSON.stringify(payload));
    const signature = sign(encodedPayload);
    return `${encodedPayload}.${signature}`;
}

function verifySessionToken(token) {
    if (!token || typeof token !== 'string' || !token.includes('.')) {
        return null;
    }

    const [encodedPayload, signature] = token.split('.');
    const expectedSignature = sign(encodedPayload);
    const providedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (providedBuffer.length !== expectedBuffer.length) {
        return null;
    }

    if (!crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
        return null;
    }

    try {
        const payload = JSON.parse(fromBase64Url(encodedPayload));

        if (!payload.exp || Date.now() > payload.exp) {
            return null;
        }

        return payload;
    } catch (error) {
        return null;
    }
}

function getSessionAccount(req) {
    const cookies = parseCookies(req.headers && req.headers.cookie);
    const token = cookies[SESSION_COOKIE_NAME];
    const payload = verifySessionToken(token);

    if (!payload) {
        return null;
    }

    const account = readAccounts().find((entry) => entry.id === payload.accountId && normalizeEmail(entry.email) === payload.email);
    return account ? sanitizeAccount(account) : null;
}

function sanitizeAccount(account) {
    const {
        password_hash,
        password_salt,
        ...safeAccount
    } = account;

    return safeAccount;
}

function buildSessionCookie(token) {
    const attributes = [
        `${SESSION_COOKIE_NAME}=${token}`,
        'HttpOnly',
        'Path=/',
        `Max-Age=${SESSION_DURATION_SECONDS}`,
        'SameSite=Lax'
    ];

    if (process.env.NODE_ENV === 'production') {
        attributes.push('Secure');
    }

    return attributes.join('; ');
}

function buildClearedSessionCookie() {
    const attributes = [
        `${SESSION_COOKIE_NAME}=`,
        'HttpOnly',
        'Path=/',
        'Max-Age=0',
        'SameSite=Lax'
    ];

    if (process.env.NODE_ENV === 'production') {
        attributes.push('Secure');
    }

    return attributes.join('; ');
}

function parseCookies(cookieHeader) {
    return String(cookieHeader || '')
        .split(';')
        .map((item) => item.trim())
        .filter(Boolean)
        .reduce((accumulator, cookiePair) => {
            const separatorIndex = cookiePair.indexOf('=');
            if (separatorIndex === -1) {
                return accumulator;
            }

            const name = cookiePair.slice(0, separatorIndex).trim();
            const value = cookiePair.slice(separatorIndex + 1).trim();
            accumulator[name] = decodeURIComponent(value);
            return accumulator;
        }, {});
}

function sign(value) {
    return crypto
        .createHmac('sha256', getSessionSecret())
        .update(value)
        .digest('base64url');
}

function getSessionSecret() {
    return process.env.CLIENT_PORTAL_SESSION_SECRET || 'pure-reach-demo-session-secret-change-me';
}

function toBase64Url(value) {
    return Buffer.from(value).toString('base64url');
}

function fromBase64Url(value) {
    return Buffer.from(value, 'base64url').toString('utf8');
}

module.exports = {
    buildClearedSessionCookie,
    buildSessionCookie,
    createSessionToken,
    findAccountByEmail,
    getSessionAccount,
    sanitizeAccount,
    verifyPassword
};
