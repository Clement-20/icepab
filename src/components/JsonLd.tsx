import React from 'react';
import { SITE_METADATA } from '../metadata';

export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": SITE_METADATA.fullName,
    "alternateName": SITE_METADATA.alternateNames,
    "description": SITE_METADATA.description,
    "url": SITE_METADATA.url,
    "jobTitle": SITE_METADATA.jobTitle,
    "knowsAbout": SITE_METADATA.knowsAbout,
    "sameAs": [
      SITE_METADATA.social.x.url,
      SITE_METADATA.social.linkedin.url,
      SITE_METADATA.social.github.url
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does ICEPAB mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `ICEPAB stands for ${SITE_METADATA.acronymMeaning}.`
        }
      },
      {
        "@type": "Question",
        "name": "Who is Clement IfeOluwa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clement IfeOluwa is a professional alias for Banmeke IfeOluwa Elijah, a systems developer and designer also known by the brand name ICEPAB."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
