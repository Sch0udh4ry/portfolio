module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const { email } = req.query || {};

    const account = {
        companyName: 'Northlane Studio',
        contactName: 'Client Team',
        email: email || 'client@northlanestudio.com',
        status: 'Active Retainer',
        planName: 'Growth Systems Plan',
        planSummary: 'Technical SEO, blog operations, creative support, reporting, and monthly consulting.',
        nextPaymentDate: 'April 18, 2026',
        invoiceStatus: 'Due in 16 days',
        paymentAmount: 'INR 48,000',
        paymentLink: 'faq.html#quote-form',
        supportContact: 'hi@sunilchoudhary.in',
        latestInvoice: {
            id: 'PRI-2026-041',
            amount: 'INR 48,000',
            status: 'Open',
            dueDate: 'April 18, 2026'
        },
        invoices: [
            { id: 'PRI-2026-041', period: 'April 2026 Retainer', amount: 'INR 48,000', status: 'Open', url: '#' },
            { id: 'PRI-2026-032', period: 'March 2026 Retainer', amount: 'INR 48,000', status: 'Paid', url: '#' },
            { id: 'PRI-2026-021', period: 'February 2026 Retainer', amount: 'INR 48,000', status: 'Paid', url: '#' }
        ],
        services: [
            {
                name: 'Technical SEO',
                state: 'In Progress',
                summary: 'Core site fixes, search visibility monitoring, schema refinement, and technical cleanup.',
                nextStep: 'Priority crawl review scheduled for April 06.'
            },
            {
                name: 'Blog Strategy',
                state: 'Publishing',
                summary: 'Editorial planning, article production, and optimization for both classic and AI-assisted search.',
                nextStep: 'Two new authority articles are ready for approval.'
            },
            {
                name: 'Creative Support',
                state: 'Queued',
                summary: 'Campaign visuals, landing support assets, and creative batches aligned with the current offer cycle.',
                nextStep: 'Next creative batch opens after the landing page revision.'
            }
        ]
    };

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
        placeholder: true,
        account
    });
};
