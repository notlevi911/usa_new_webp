import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { EnquiryProvider } from '@/context/EnquiryContext';
import { CurtainProvider } from '@/context/CurtainContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryPill from '@/components/EnquiryPill';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'United Supply Agency — Railway relay components',
  description:
    'Springs, sheet-metal parts and hardware for railway signalling relays. ISO 9001:2015 certified. Kolkata & Howrah.',
};

const NO_FLASH_SCRIPT = `
(function () {
  try {
    var t = localStorage.getItem('usa-theme') || 'light';
    var themes = {
      light: {},
      dark: { paper:'#121814','paper-2':'#19211c',card:'#171e19',ink:'#e2e8de','ink-soft':'#c2cbc0',muted:'#8e998f',line:'#2f3a33','line-2':'#27312b',glass:'rgba(18,24,20,.86)',deep:'#0b100d','on-deep':'#e2e8de','on-deep-muted':'#97a298','deep-line':'#26302a' }
    };
    var vars = themes[t] || {};
    var root = document.documentElement;
    Object.keys(vars).forEach(function (k) { root.style.setProperty('--' + k, vars[k]); });
    root.style.colorScheme = t;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body
        style={{
          fontFamily: 'var(--font-inter), system-ui, -apple-system, "Segoe UI", sans-serif',
          minHeight: '100vh',
          background: 'var(--paper)',
          color: 'var(--ink)',
        }}
      >
        <ThemeProvider>
          <EnquiryProvider>
            <CurtainProvider>
              <Header />
              {children}
              <Footer />
              <EnquiryPill />
            </CurtainProvider>
          </EnquiryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
