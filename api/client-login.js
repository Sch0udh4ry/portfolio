const {
    buildSessionCookie,
    createSessionToken,
    findAccountByEmail,
    sanitizeAccount,
    verifyPassword
} = require('./_client-portal-auth');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const payload = normalizeBody(req.body);
    const email = String(payload.email || '').trim().toLowerCase();
    const password = String(payload.password || '');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Enter a valid email address.' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Enter your password.' });
    }

    const account = findAccountByEmail(email);

    if (!account || !verifyPassword(password, account)) {
        return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    const token = createSessionToken(account);

    res.setHeader('Set-Cookie', buildSessionCookie(token));
    res.setHeader('Cache-Control', 'no-store');

    return res.status(200).json({
        message: 'Login successful.',
        account: sanitizeAccount(account)
    });
};

function normalizeBody(body) {
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
