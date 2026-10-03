'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CompassMark from './CompassMark';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Quality', href: '/#quality' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 760 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const hidden = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'var(--glass)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--line-2)',
          transition: 'transform .45s cubic-bezier(.2,.7,.2,1)',
          transform: hidden ? 'translateY(-101%)' : 'translateY(0)',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 clamp(20px,4vw,48px)',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink)' }}>
            <CompassMark size={30} />
            <span
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 600,
                fontSize: 'clamp(16px,4.4vw,19px)',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              United Supply Agency
            </span>
          </Link>
          <nav aria-label="Main" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,2.2vw,28px)' }}>
            <div className="header-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,2.2vw,28px)' }}>
              {NAV_LINKS.map((item) => {
                const on = item.href === '/' ? pathname === '/' : item.href.startsWith('/#') ? false : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      position: 'relative',
                      fontSize: 14,
                      color: 'var(--ink)',
                      padding: '6px 0',
                      fontWeight: on ? 500 : 400,
                    }}
                  >
                    {item.label}
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 1,
                        background: 'var(--ink)',
                        transform: `scaleX(${on ? 1 : 0})`,
                        transformOrigin: 'left',
                        transition: 'transform .3s ease',
                      }}
                    />
                  </Link>
                );
              })}
            </div>
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="header-hamburger"
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                border: '1px solid var(--line)',
                background: 'var(--card)',
                cursor: 'pointer',
                padding: 0,
                display: 'none',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                flex: 'none',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 16,
                  height: 1.5,
                  background: 'var(--ink)',
                  transition: 'transform .35s cubic-bezier(.2,.7,.2,1)',
                  transform: menuOpen ? 'translateY(3.25px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 16,
                  height: 1.5,
                  background: 'var(--ink)',
                  transition: 'transform .35s cubic-bezier(.2,.7,.2,1)',
                  transform: menuOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </nav>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
