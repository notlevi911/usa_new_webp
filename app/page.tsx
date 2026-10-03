import TransitionLink from '@/components/TransitionLink';
import CompassMark from '@/components/CompassMark';
import ThemeToggle from '@/components/ThemeToggle';
import HeroTrain from '@/components/HeroTrain';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import { CATEGORIES, PRODUCTS } from '@/lib/products';

const HERO_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Product range', href: '/#range' },
  { label: 'Quality', href: '/#quality' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Contact', href: '/contact' },
];

const CREDS = [
  { code: 'ISO 9001:2015', label: 'Certified quality management system' },
  { code: 'EM-II (SSI)', label: 'Registered small-scale industry unit' },
  { code: 'NSIC', label: 'Registered with the National Small Industries Corporation' },
  { code: 'GSTIN', label: '19AACFU5394F1ZU' },
];

const CLIENT_NAMES = ['Areca', 'Digital Communication (DCC)', 'Ultra Electronics', 'Crompton Greaves'];
const CLIENTS = [
  { name: 'Areca', note: 'Relay components' },
  { name: 'Digital Communication (DCC)', note: 'Relay components' },
  { name: 'Ultra Electronics', note: 'Relay components' },
  { name: 'Crompton Greaves', note: 'Recently onboarded' },
];

const CAPABILITIES = ['Springs', 'Sheet-metal jobs', 'Hardware items', 'Nylon & Teflon (PTFE)', 'Tubes', 'Bushes', 'Washers', 'General order supply'];

const pad = (n: number) => String(n).padStart(2, '0');

export default function HomePage() {
  const rangeRows = CATEGORIES.map((c, i) => {
    const items = PRODUCTS.filter((p) => p.cat === c.id);
    const sample = items.slice(0, 4).map((p) => p.name).join(' · ') + (items.length > 4 ? ` + ${items.length - 4} more` : '');
    return { num: pad(i + 1), name: c.name, sample, href: `/products?cat=${c.id}`, delay: i * 60 };
  });

  return (
    <main>
      <section
        id="top"
        style={{
          position: 'relative',
          width: '100%',
          height: '100svh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--paper)',
          isolation: 'isolate',
        }}
      >
        <div style={{ position: 'absolute', top: 'clamp(16px,2vw,24px)', right: 'clamp(16px,3vw,32px)', zIndex: 3 }}>
          <ThemeToggle />
        </div>
        <div aria-hidden="true" style={{ order: 2, flex: '1 1 0', minHeight: 0, position: 'relative', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
          <HeroTrain />
        </div>
        <div style={{ order: 1, flex: 'none', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'clamp(28px,2.8vw,36px) 16px 0' }}>
          <CompassMark style={{ width: 'clamp(44px,4.1vw,54px)', height: 'auto' }} />
          <Reveal
            as="h1"
            delay={80}
            style={{
              margin: 'clamp(8px,1vw,14px) 0 0',
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 600,
              fontSize: 'clamp(36px,4.4vw,60px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            United Supply Agency
          </Reveal>
          <Reveal as="p" delay={160} style={{ margin: 'clamp(14px,1.4vw,18px) 0 0', fontSize: 'clamp(14px,1.1vw,16px)', lineHeight: 1.5, color: 'var(--ink-soft)', maxWidth: '52em' }}>
            Springs, sheet-metal parts and hardware for railway signalling relays. Manufactured in Howrah, West Bengal.
          </Reveal>
          <Reveal as="nav" delay={240} aria-label="Sections" style={{ marginTop: 'clamp(24px,3vw,38px)' }}>
            <ul className="hero-nav-list" style={{ listStyle: 'none', margin: '0 auto', padding: 0, alignItems: 'center', rowGap: 2, columnGap: 16, justifyContent: 'center' }}>
              {HERO_LINKS.map((item, i) => (
                <li key={item.label} className="hero-nav-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {i > 0 && (
                    <span className="hero-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--ink)', margin: '0 clamp(16px,1.8vw,24px) 0 0', flex: 'none' }} />
                  )}
                  <TransitionLink
                    href={item.href}
                    className="link-underline-grow"
                    style={{
                      position: 'relative',
                      color: 'var(--ink)',
                      fontSize: 'clamp(14px,1.1vw,15px)',
                      padding: '6px 2px',
                    }}
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="p" delay={320} style={{ margin: 'clamp(18px,2.2vw,28px) 0 0', fontSize: 11.5, color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
            ISO 9001:2015 Certified · EM-II (SSI) &amp; NSIC Unit
          </Reveal>
        </div>
      </section>

      <section id="about" style={{ padding: 'clamp(80px,11vw,150px) 0 clamp(60px,8vw,110px)', borderTop: '1px solid var(--line-2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <Reveal as="p" style={{ margin: '0 0 28px', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            The company
          </Reveal>
          <Reveal
            as="p"
            delay={80}
            style={{
              margin: 0,
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(28px,3.8vw,52px)',
              lineHeight: 1.14,
              letterSpacing: '-0.02em',
              maxWidth: '22ch',
              color: 'var(--ink)',
            }}
          >
            We make the small parts that go inside railway signalling relays — springs, 4BA stack screws, operating arms, connectors and bobbins.
          </Reveal>
          <div style={{ marginTop: 'clamp(56px,7vw,96px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 0, borderTop: '1px solid var(--ink)' }}>
            <Reveal style={{ padding: '22px 24px 0 0' }}>
              <p style={{ margin: 0, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Office</p>
              <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.55, color: 'var(--ink)' }}>
                28/C Christopher Road
                <br />
                Kolkata 700046
              </p>
            </Reveal>
            <Reveal delay={80} style={{ padding: '22px 24px 0 0' }}>
              <p style={{ margin: 0, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Factory</p>
              <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.55, color: 'var(--ink)' }}>
                Village Garbalia, Para Manna Para
                <br />
                Jagatballavpur, Howrah 711410
              </p>
            </Reveal>
            <Reveal delay={160} style={{ padding: '22px 24px 0 0' }}>
              <p style={{ margin: 0, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Materials</p>
              <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.55, color: 'var(--ink)' }}>
                Stainless steel S.S. 202, 204 &amp; 304, LAMTUF laminate, silicone, rubber, nylon &amp; PTFE
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="range" style={{ padding: 'clamp(60px,8vw,110px) 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 'clamp(32px,4vw,56px)' }}>
            <div>
              <Reveal as="p" style={{ margin: '0 0 18px', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Product range
              </Reveal>
              <Reveal
                as="h2"
                delay={80}
                style={{ margin: 0, fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(32px,4.4vw,58px)', lineHeight: 1.04, letterSpacing: '-0.025em', maxWidth: '16ch' }}
              >
                Thirty-five components in six families.
              </Reveal>
            </div>
            <Reveal style={{ display: 'inline-block' }}>
              <TransitionLink
                href="/products"
                className="btn-invert"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', border: '1px solid var(--ink)', borderRadius: 999, fontSize: 14, fontWeight: 500, color: 'var(--ink)', transition: 'background .25s ease,color .25s ease' }}
              >
                Open the catalogue <span aria-hidden="true">→</span>
              </TransitionLink>
            </Reveal>
          </div>
          <div style={{ borderTop: '1px solid var(--ink)' }}>
            {rangeRows.map((row) => (
              <TransitionLink key={row.href} href={row.href} style={{ display: 'block', color: 'var(--ink)' }}>
                <Reveal
                  delay={row.delay}
                  className="range-row"
                  style={{ alignItems: 'center', borderBottom: '1px solid var(--line)', transition: 'background .3s ease,color .3s ease,padding .3s ease' }}
                >
                  <span style={{ gridArea: 'num', fontSize: 13, fontVariantNumeric: 'tabular-nums', opacity: 0.7 }}>{row.num}</span>
                  <span style={{ gridArea: 'name', fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(20px,2.2vw,28px)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                    {row.name}
                  </span>
                  <span style={{ gridArea: 'sample', fontSize: 14, lineHeight: 1.5, opacity: 0.8 }}>{row.sample}</span>
                  <span aria-hidden="true" style={{ gridArea: 'arrow', fontSize: 20, textAlign: 'right' }}>
                    →
                  </span>
                </Reveal>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      <section id="quality" style={{ padding: 'clamp(60px,8vw,110px) 0', background: 'var(--paper-2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <Reveal as="p" style={{ margin: '0 0 18px', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Quality &amp; registration
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            style={{ margin: '0 0 clamp(40px,5vw,64px)', fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(32px,4.4vw,58px)', lineHeight: 1.04, letterSpacing: '-0.025em', maxWidth: '18ch' }}
          >
            Certified, registered and on record.
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16 }}>
            {CREDS.map((c, i) => (
              <Reveal
                key={c.code}
                delay={i * 80}
                className="card-lift"
                style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 4, padding: '28px 24px 26px', display: 'flex', flexDirection: 'column', gap: 40, minHeight: 200, transition: 'transform .35s cubic-bezier(.2,.7,.2,1),border-color .3s ease' }}
              >
                <span style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(22px,2.2vw,28px)', letterSpacing: '-0.01em', lineHeight: 1.1, wordBreak: 'break-word' }}>
                  {c.code}
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)', marginTop: 'auto' }}>{c.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" style={{ padding: 'clamp(70px,9vw,120px) 0', background: 'var(--deep)', color: 'var(--on-deep)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <Reveal as="p" style={{ margin: '0 0 18px', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--on-deep-muted)' }}>
            Who we supply
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            style={{ margin: 0, fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(32px,4.4vw,58px)', lineHeight: 1.04, letterSpacing: '-0.025em', maxWidth: '18ch', color: 'var(--on-deep)' }}
          >
            Parts for the companies that build India&apos;s relays.
          </Reveal>
        </div>
        <Marquee names={CLIENT_NAMES} />
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <div style={{ marginTop: 'clamp(36px,4vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 24 }}>
            {CLIENTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 80} style={{ borderTop: '1px solid var(--deep-line)', paddingTop: 16 }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: 'var(--on-deep)' }}>{c.name}</p>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--on-deep-muted)' }}>{c.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" style={{ padding: 'clamp(70px,9vw,120px) 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(40px,6vw,96px)', alignItems: 'start' }}>
          <div>
            <Reveal as="p" style={{ margin: '0 0 18px', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Beyond the catalogue
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              style={{ margin: 0, fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(32px,4.4vw,58px)', lineHeight: 1.04, letterSpacing: '-0.025em' }}
            >
              Send a drawing or a sample. We will quote.
            </Reveal>
            <Reveal as="p" delay={160} style={{ margin: '24px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '38ch' }}>
              Alongside relay components we take on general order supply across these lines of work.
            </Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', borderTop: '1px solid var(--ink)' }}>
            {CAPABILITIES.map((name, i) => (
              <Reveal
                key={name}
                delay={(i % 2) * 60 + Math.floor(i / 2) * 50}
                style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '20px 12px 20px 0', borderBottom: '1px solid var(--line)' }}
              >
                <span style={{ fontSize: 12, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{pad(i + 1)}</span>
                <span style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(18px,1.8vw,22px)', letterSpacing: '-0.01em' }}>{name}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(70px,9vw,120px)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <Reveal
            style={{ border: '1px solid var(--ink)', borderRadius: 6, padding: 'clamp(36px,6vw,80px)', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}
          >
            <h2 style={{ margin: 0, fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(34px,5vw,68px)', lineHeight: 1, letterSpacing: '-0.03em', maxWidth: '12ch' }}>
              Need parts for your next relay batch?
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <TransitionLink
                href="/contact"
                className="cta-lift"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 26px', borderRadius: 999, background: 'var(--ink)', color: 'var(--paper)', fontSize: 15, fontWeight: 500, transition: 'transform .25s ease' }}
              >
                Request a quote <span aria-hidden="true">→</span>
              </TransitionLink>
              <a
                href="tel:+919432569419"
                className="btn-invert"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 26px', borderRadius: 999, border: '1px solid var(--ink)', color: 'var(--ink)', fontSize: 15, fontWeight: 500, transition: 'background .25s ease,color .25s ease' }}
              >
                +91 94325 69419
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
