const htmlRedirectSlugs = [
  "about",
  "blog-content-google-bing-chatgpt-gemini",
  "blog",
  "client-portal",
  "contact",
  "course-communication-skills",
  "course-csat-basics",
  "course-customer-interaction",
  "course-design-basics",
  "course-digital-marketing-overview",
  "course-ecommerce-fundamentals",
  "course-english-basics",
  "course-free-ai-tools",
  "course-google-ads",
  "course-office-basics",
  "course-prompt-structure",
  "course-public-speaking",
  "course-python-automation",
  "course-seo-fundamentals",
  "course-social-media-basics",
  "course-ticketing-resolution",
  "course-topic-speaking-structure",
  "course-web-design",
  "course-youtube-creator",
  "ecommerce",
  "faq",
  "instagram-ad-calculator",
  "login",
  "privacy",
  "resources",
  "services",
  "support",
  "technical-seo-checklist-small-business",
  "terms",
  "typing-test",
  "website-redesign-seo-mistakes",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      ...htmlRedirectSlugs.map((slug) => ({
        source: `/${slug}.html`,
        destination: `/${slug}`,
        permanent: true,
      })),
    ];
  },
};

module.exports = nextConfig;
