import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_METADATA } from '../metadata';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image?: string;
}

const initialStories: BlogPost[] = [
  {
    id: '1',
    title: 'What is the OAU Post-UTME format?',
    excerpt: 'Quick facts, eligibility requirements, examination format, and tips for success for the OAU Post-UTME screening test.',
    content: `The OAU Post-UTME exam consists of 40 questions to be answered in 60 minutes. Subjects include English (compulsory), General Paper/Aptitude, and three core subjects related to your chosen course. The screening is computer-based and designed to test speed, reasoning, and mastery of your course subjects.

Hello, future Great Ife student! As a current OAU student, I know the Post-UTME journey can feel tough. But with the right information, you will do well. Let me guide you through what to expect for OAU admission, how to prepare, and the key facts you need. You can do this!

**Quick Facts for OAU Admission and Great Ife Aspirants:**

- **Exam:** Computer-based
- **Questions:** 40 multiple-choice
- **Time:** 60 minutes
- **Subjects:** English (compulsory), three core subjects, General Paper/Aptitude
- **Eligibility:** OAU as first choice, 200+ in UTME, 5 O'Level credits in no more than two sittings
- **Screening:** Key step for OAU admission

| Feature | Details |
| :--- | :--- |
| **JAMB Cut-off Mark** | 200 and above (General) |
| **Exam Format** | Computer Based Test (CBT) |
| **Subject Mix** | English, Aptitude, and Core Subjects |
| **Official Portal** | admissions.oauife.edu.ng |

---

## Who Can Apply for OAU Post-UTME?

### What are the eligibility requirements for OAU Post-UTME?

You must meet these requirements to sit for the OAU Post-UTME:

* Choose OAU as your first choice institution.
* Score a minimum of 200 in the 2026 UTME.
* Have at least 5 Credit passes in relevant O'Level subjects (WAEC/NECO/GCE) in not more than two sittings.

Meet all these to maximize your chances for OAU admission.

### 2. The Examination Format: What to Expect

OAU sets a tough screening test. You will answer 40 questions in 60 minutes. The questions test your speed and understanding. This screening is a crucial step for your OAU admission.

* **English Language** is compulsory for everyone.
* **General Paper/Aptitude** tests your knowledge of current affairs and logical reasoning.
* You will also answer questions in **three core subjects** related to your course. For example, Business Administration candidates will see Economics, Government, and Mathematics.

### 3. Tips for Success (Insider Secrets)

* **Practice past questions.** OAU often repeats themes. Focus on understanding, not just memorizing answers.
* **Work fast.** Sixty minutes for 40 questions can go quickly, especially with tough subjects.
* **Check the school portal often.** Information can change quickly. Print your exam schedule as soon as it is available.

Practice online at [www.oau.cbt.name.ng](http://www.oau.cbt.name.ng). Use this resource to get familiar with the test format. Mastering the test format boosts your confidence for OAU admission into Great Ife.
`,
    date: 'MAY 08, 2026',
    author: SITE_METADATA.alias,
    readTime: '4 MIN'
  },
  {
    id: '2',
    title: 'The Architecture of Personal Operating Systems',
    excerpt: 'How we transition from static portfolios to dynamic, living digital environments. The journey of building the ICEPAB Life OS...',
    content: 'How we transition from static portfolios to dynamic, living digital environments. The journey of building the ICEPAB Life OS is an ongoing exploration into identity and decentralized data structures. We are building systems that act as an extension of the human mind, archiving thoughts, code, and design securely on the distributed web.',
    date: 'APRIL 14, 2026',
    author: SITE_METADATA.alias,
    readTime: '12 MIN'
  },
  {
    id: '3',
    title: 'Decentralization and the Future of SaaS Identity',
    excerpt: 'Exploring the intersection of cryptographic verifiable identity and the human need for authentic connection in an automated SaaS era...',
    content: 'Exploring the intersection of cryptographic verifiable identity and the human need for authentic connection in an automated SaaS era. As systems become more automated, the fundamental trust layer relies heavily on verifiable metadata.',
    date: 'MARCH 22, 2026',
    author: SITE_METADATA.fullName,
    readTime: '15 MIN'
  }
];

interface BlogContextType {
  stories: BlogPost[];
  addStory: (story: Omit<BlogPost, 'id' | 'date' | 'author' | 'readTime'>) => void;
}

const BlogContext = createContext<BlogContextType>({
  stories: initialStories,
  addStory: () => {},
});

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [stories, setStories] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem('icepab_blog_stories');
      return stored ? JSON.parse(stored) : initialStories;
    } catch (e) {
      return initialStories;
    }
  });

  useEffect(() => {
    localStorage.setItem('icepab_blog_stories', JSON.stringify(stories));
  }, [stories]);

  const addStory = (storyData: Omit<BlogPost, 'id' | 'date' | 'author' | 'readTime'>) => {
    const newStory: BlogPost = {
      ...storyData,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
      author: SITE_METADATA.alias,
      readTime: Math.max(1, Math.ceil(storyData.content.split(' ').length / 200)) + ' MIN'
    };
    
    setStories(prev => [newStory, ...prev]);
  };

  return (
    <BlogContext.Provider value={{ stories, addStory }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
