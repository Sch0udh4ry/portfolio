const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    try {
        const filePath = path.join(process.cwd(), 'data', 'reviews.json');
        const reviews = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
        return res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).json({ message: 'Could not load reviews.' });
    }
};
