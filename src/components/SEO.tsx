import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useKnowledge } from '../contexts/KnowledgeContext';
import JsonLd from './JsonLd';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function SEO({ 
  title, 
  description,
  image
}: SEOProps) {
  const { knowledge } = useKnowledge();
  
  const activeTitle = title || knowledge.title;
  const activeDescription = description || knowledge.description;
  const activeImage = image || knowledge.ogImage;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ICEPAB Systems",
    "alternateName": knowledge.alias,
    "url": knowledge.url,
    "logo": `${knowledge.url}/logo.png`,
    "description": activeDescription,
    "foundingDate": (knowledge as any).foundingDate,
    "founder": {
      "@type": "Person",
      "name": knowledge.fullName,
      "alternateName": knowledge.alternateNames
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": (knowledge as any).contactEmail,
      "contactType": "technical support"
    },
    "sameAs": Object.values(knowledge.social).map((s: any) => s.url)
  };

  const finalTitle = activeTitle.includes('|') ? activeTitle : `${activeTitle} | ${knowledge.alias}`;

  return (
    <>
      <JsonLd />
      <Helmet>
        {/* JSON-LD Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>

        {/* Primary Meta Tags */}
        <title>{finalTitle}</title>
        <meta name="description" content={activeDescription} />
        <meta name="keywords" content={knowledge.keywords} />
        <meta name="author" content={knowledge.author} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={knowledge.url} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={activeDescription} />
        <meta property="og:image" content={activeImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={knowledge.url} />
        <meta property="twitter:title" content={finalTitle} />
        <meta property="twitter:description" content={activeDescription} />
        <meta property="twitter:image" content={activeImage} />
      </Helmet>
    </>
  );
}
