import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_METADATA } from '../metadata';

export type KnowledgeBase = typeof SITE_METADATA;

interface KnowledgeContextType {
  knowledge: KnowledgeBase;
  updateKnowledge: (data: Partial<KnowledgeBase>) => void;
}

const KnowledgeContext = createContext<KnowledgeContextType>({
  knowledge: SITE_METADATA,
  updateKnowledge: () => {},
});

export function KnowledgeProvider({ children }: { children: React.ReactNode }) {
  const [knowledge, setKnowledge] = useState<KnowledgeBase>(() => {
    try {
      const stored = localStorage.getItem('icepab_knowledge_base');
      return stored ? { ...SITE_METADATA, ...JSON.parse(stored) } : SITE_METADATA;
    } catch (e) {
      return SITE_METADATA;
    }
  });

  useEffect(() => {
    localStorage.setItem('icepab_knowledge_base', JSON.stringify(knowledge));
  }, [knowledge]);

  const updateKnowledge = (data: Partial<KnowledgeBase>) => {
    setKnowledge(prev => ({ ...prev, ...data }));
  };

  return (
    <KnowledgeContext.Provider value={{ knowledge, updateKnowledge }}>
      {children}
    </KnowledgeContext.Provider>
  );
}

export const useKnowledge = () => useContext(KnowledgeContext);
