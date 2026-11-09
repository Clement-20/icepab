import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useKnowledge } from '../contexts/KnowledgeContext';
import JsonLd from './JsonLd';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  pageKey?: string;
  projectId?: string;
}

export default function SEO({ 
  title, 
  description,
  image,
  pageKey,
  projectId
}: SEOProps) {
  const { knowledge } = useKnowledge();
  const [metaOverride, setMetaOverride] = useState<{ title?: string; description?: string; image?: string } | null>(null);

  useEffect(() => {
    try {
      const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
      let resolvedKey = pageKey;
      if (!resolvedKey) {
        if (pathname === '/') resolvedKey = 'home';
        else if (pathname.startsWith('/portfolio')) resolvedKey = 'portfolio';
        else if (pathname.startsWith('/automations')) resolvedKey = 'automations';
        else if (pathname.startsWith('/reviews')) resolvedKey = 'reviews';
        else if (pathname.startsWith('/about')) resolvedKey = 'about';
        else if (pathname.startsWith('/designs')) resolvedKey = 'designs';
        else if (pathname.startsWith('/stories')) resolvedKey = 'stories';
        else if (pathname.startsWith('/systems')) resolvedKey = 'systems';
        else if (pathname.startsWith('/admin')) resolvedKey = 'admin';
      }

      if (projectId) {
        const storedProj = localStorage.getItem('icepab_project_metadata_overrides');
        if (storedProj) {
          const parsed = JSON.parse(storedProj);
          if (parsed[projectId]) {
            setMetaOverride(parsed[projectId]);
            return;
          }
        }
      }

      if (resolvedKey) {
        const storedPages = localStorage.getItem('icepab_page_metadata_overrides');
        if (storedPages) {
          const parsed = JSON.parse(storedPages);
          if (parsed[resolvedKey]) {
            setMetaOverride(parsed[resolvedKey]);
          }
        }
      }
    } catch (e) {}
  }, [pageKey, projectId]);

  const activeTitle = metaOverride?.title || title || knowledge.title;
  const activeDescription = metaOverride?.description || description || knowledge.description;
  const activeImage = metaOverride?.image || image || knowledge.ogImage;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : knowledge.url;

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
    "sameAs": Object.values(knowledge.social || {}).map((s: any) => s?.url).filter(Boolean)
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
        <link rel="canonical" href={currentUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={activeDescription} />
        <meta property="og:image" content={activeImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={finalTitle} />
        <meta property="twitter:description" content={activeDescription} />
        <meta property="twitter:image" content={activeImage} />
      </Helmet>
    </>
  );
}
