// src/pages/Invoice/components/InvoiceMetaTags.jsx
import { useEffect } from 'react';

const InvoiceMetaTags = () => {
  useEffect(() => {
    // Update title
    document.title = 'Neon Burro - Complete Your Payment';
    
    // Update meta tags
    const metaTags = [
      { property: 'og:title', content: 'Neon Burro - Complete Your Payment' },
      { property: 'og:description', content: 'Secure payment processing for your digital project. Quick, easy, and protected by Stripe.' },
      { property: 'og:image', content: 'https://neonburro.com/payment-sms.png' },
      { property: 'og:url', content: 'https://neonburro.com/invoice' },
      { name: 'twitter:title', content: 'Neon Burro - Complete Your Payment' },
      { name: 'twitter:description', content: 'Secure payment processing for your digital project. Quick, easy, and protected by Stripe.' },
      { name: 'twitter:image', content: 'https://neonburro.com/payment-sms.png' },
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

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = 'Neon Burro - Digital Craftsmanship from Colorado';
      
      const originalMetaTags = [
        { property: 'og:title', content: 'Neon Burro - Digital Craftsmanship from Colorado' },
        { property: 'og:description', content: 'We build exceptional web experiences with mountain-inspired creativity. Custom development & design from Ridgway, CO.' },
        { property: 'og:image', content: 'https://neonburro.com/main-sms-burro.png' },
        { property: 'og:url', content: 'https://neonburro.com/' },
        { name: 'twitter:title', content: 'Neon Burro - Digital Craftsmanship from Colorado' },
        { name: 'twitter:description', content: 'We build exceptional web experiences with mountain-inspired creativity. Custom development & design from Ridgway, CO.' },
        { name: 'twitter:image', content: 'https://neonburro.com/main-sms-burro.png' },
      ];

      originalMetaTags.forEach(({ property, name, content }) => {
        const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
        const metaTag = document.querySelector(selector);
        if (metaTag) {
          metaTag.setAttribute('content', content);
        }
      });
    };
  }, []);

  return null;
};

export default InvoiceMetaTags;