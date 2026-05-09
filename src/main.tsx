import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { KnowledgeProvider } from './contexts/KnowledgeContext';
import { BlogProvider } from './contexts/BlogContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <KnowledgeProvider>
        <BlogProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BlogProvider>
      </KnowledgeProvider>
    </HelmetProvider>
  </StrictMode>,
);
