// src/pages/Invoice/components/InvoiceMetaTags.jsx
import { useEffect } from 'react';

const InvoiceMetaTags = () => {
  useEffect(() => {
    // Update title
    document.title = 'Neon Burro - Fuel Your Digital Journey';
    
    // Update meta tags
    const metaTags = [
      { property: 'og:title', content: 'Ready to Launch? Complete Your Payment | Neon Burro' },
      { property: 'og:description', content: 'One click away from transforming your digital presence. Secure checkout powered by Stripe. Let\'s build something extraordinary together.' },
      { property: 'og:image', content: 'https://neonburro.com/payment-sms.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Neon Burro Payment Portal' },
      { property: 'og:url', content: 'https://neonburro.com/invoice' },
      { property: 'og:type', content: 'website' },
      { name: 'title', content: 'Ready to Launch? Complete Your Payment | Neon Burro' },
      { name: 'description', content: 'One click away from transforming your digital presence. Secure checkout powered by Stripe. Let\'s build something extraordinary together.' },
      { name: 'twitter:title', content: 'Ready to Launch? Complete Your Payment | Neon Burro' },
      { name: 'twitter:description', content: 'One click away from transforming your digital presence. Secure checkout powered by Stripe. Let\'s build something extraordinary together.' },
      { name: 'twitter:image', content: 'https://neonburro.com/payment-sms.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ];

    // Update existing meta tags or create new ones
    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) metaTag.setAttribute('property', property);
        if (name) metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    });

    // Force refresh for social media crawlers
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', 'https://neonburro.com/invoice');
    }

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = 'Neon Burro - Digital Craftsmanship from Colorado';
      
      const originalMetaTags = [
        { property: 'og:title', content: 'Neon Burro - Digital Craftsmanship from Colorado' },
        { property: 'og:description', content: 'We build exceptional web experiences with mountain-inspired creativity. Custom development & design from Ridgway, CO.' },
        { property: 'og:image', content: 'https://neonburro.com/main-sms-burro.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Neon Burro - Digital Agency' },
        { property: 'og:url', content: 'https://neonburro.com/' },
        { property: 'og:type', content: 'website' },
        { name: 'title', content: 'Neon Burro - Digital Craftsmanship from Colorado' },
        { name: 'description', content: 'We build exceptional web experiences with mountain-inspired creativity. Custom development & design from Ridgway, CO.' },
        { name: 'twitter:title', content: 'Neon Burro - Digital Craftsmanship from Colorado' },
        { name: 'twitter:description', content: 'We build exceptional web experiences with mountain-inspired creativity. Custom development & design from Ridgway, CO.' },
        { name: 'twitter:image', content: 'https://neonburro.com/main-sms-burro.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ];

      originalMetaTags.forEach(({ property, name, content }) => {
        const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
        const metaTag = document.querySelector(selector);
        if (metaTag) {
          metaTag.setAttribute('content', content);
        }
      });

      // Restore canonical URL
      const linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', 'https://neonburro.com/');
      }
    };
  }, []);

  return null;
};

export default InvoiceMetaTags;