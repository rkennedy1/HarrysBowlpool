import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './presentation/App.tsx';
import ErrorBoundary from './presentation/approot/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
