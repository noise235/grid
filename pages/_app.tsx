// Next.js App Component
// Global application configuration and styles

import type { AppProps } from 'next/app';
import { LanguageProvider } from '../contexts/LanguageContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider defaultLanguage="en">
      <div className="dark">
        <Component {...pageProps} />
      </div>
    </LanguageProvider>
  );
}
