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
    "sameAs": Object.values(knowledge.social || {}).map((s: any) => s?.url).filter(Boolean)
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
      },
      {
        "@type": "Question",
        "name": `Who is ${knowledge.fullName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${knowledge.fullName} is a Systems Developer, UI/UX Designer, and Digital Business Architect based in Nigeria. He is the founder of ICEPAB Systems and studied Business Administration at Obafemi Awolowo University (OAU).`
        }
      },
      {
        "@type": "Question",
        "name": "What is ExamGuard (OAU CBT)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ExamGuard is a high-security, custom computer-based testing engine engineered for Obafemi Awolowo University (OAU) CBT exams. It secures student candidate environments, prevents keyboard modifier bypasses, and maintains high-concurrency throughput under massive parallel workloads."
        }
      },
      {
        "@type": "Question",
        "name": "How to contact Clement IfeOluwa (ICEPAB)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can contact Clement IfeOluwa via email at ${knowledge.contactEmail} or securely through his official WhatsApp link at ${knowledge.social?.whatsapp?.url || '#'} or phone number ${knowledge.social?.whatsapp?.handle || 'N/A'}.`
        }
      },
      {
        "@type": "Question",
        "name": "What is ICEPAB Systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ICEPAB Systems is a specialized agency founded by Banmeke IfeOluwa Elijah on October 12, 2021. It delivers custom high-performance digital systems, SaaS engineering solutions, custom computer-based testing sandboxes, storefront engines, and operational webhook routers."
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
