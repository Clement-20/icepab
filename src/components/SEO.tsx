import React from 'react';
import { SITE_METADATA } from '../metadata';
import JsonLd from './JsonLd';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function SEO({ 
  title = SITE_METADATA.title, 
  description = SITE_METADATA.description,
  image = `${SITE_METADATA.url}/og-image.png`
}: SEOProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IcePab Systems",
    "url": SITE_METADATA.url,
    "logo": `${SITE_METADATA.url}/logo.png`,
    "description": description,
    "sameAs": [
      SITE_METADATA.social.x.url,
      SITE_METADATA.social.linkedin.url,
      SITE_METADATA.social.github.url
    ]
  };

  return (
    <>
      <JsonLd />
      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Primary Meta Tags */}
      <title>{`${title} | IcePab`}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_METADATA.url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={SITE_METADATA.url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </>
  );
}
