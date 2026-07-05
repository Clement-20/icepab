import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useKnowledge } from '../contexts/KnowledgeContext';

export default function JsonLd() {
  const { knowledge } = useKnowledge();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": knowledge.fullName,
    "alternateName": knowledge.alternateNames,
    "description": knowledge.description,
    "url": knowledge.url,
    "jobTitle": knowledge.jobTitle,
    "email": (knowledge as any).contactEmail,
    "knowsAbout": knowledge.knowsAbout,
    "knowsLanguage": ["English", "Yoruba"],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Obafemi Awolowo University",
      "alternateName": "OAU"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "ICEPAB Systems",
      "alternateName": "ICEPAB"
    },
    "sameAs": Object.values(knowledge.social).map((s: any) => s.url)
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What does ${knowledge.alias} mean?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${knowledge.alias} stands for ${knowledge.acronymMeaning}.`
        }
      },
      {
        "@type": "Question",
        "name": "Who is Clement IfeOluwa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Clement IfeOluwa is a professional alias for ${knowledge.fullName}, a systems developer and designer also known by the brand name ${knowledge.alias}.`
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
