const {
    getSessionAccount
} = require('./_client-portal-auth');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const account = getSessionAccount(req);

    if (!account) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(401).json({ message: 'Please log in to view the client portal.' });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ account });
};
