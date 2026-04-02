const {
    buildClearedSessionCookie
} = require('./_client-portal-auth');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    res.setHeader('Set-Cookie', buildClearedSessionCookie());
    res.setHeader('Cache-Control', 'no-store');

    return res.status(200).json({ message: 'Logged out.' });
};
