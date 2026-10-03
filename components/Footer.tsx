export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--deep)', color: 'var(--on-deep)', padding: 'clamp(56px,7vw,88px) 0 28px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 36 }}>
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 600, fontSize: 26, letterSpacing: '-0.015em', color: 'var(--on-deep)' }}>
              United Supply Agency
            </p>
            <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--on-deep-muted)', maxWidth: '30ch' }}>
              All kinds of spring, sheet metal job, hardware items, nylon and Teflon (PTFE). Tube, bush, washer and
              general order suppliers.
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 12px', fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--on-deep-muted)' }}>
              Office
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--on-deep)' }}>
              28/C Christopher Road
              <br />
              Kolkata 700046
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 12px', fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--on-deep-muted)' }}>
              Factory
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--on-deep)' }}>
              Village Garbalia, Para Manna Para
              <br />
              Jagatballavpur, Howrah 711410
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 12px', fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--on-deep-muted)' }}>
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, lineHeight: 1.6 }}>
              <a href="tel:+919432569419" style={{ color: 'var(--on-deep)' }}>
                +91 94325 69419
              </a>
              <a href="tel:+918777201678" style={{ color: 'var(--on-deep)' }}>
                +91 87772 01678
              </a>
              <a href="mailto:unitedsupplyagency@gmail.com" style={{ color: 'var(--on-deep)', wordBreak: 'break-word' }}>
                unitedsupplyagency@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 'clamp(48px,6vw,72px)',
            paddingTop: 20,
            borderTop: '1px solid var(--deep-line)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 12,
            fontSize: 12,
            color: 'var(--on-deep-muted)',
          }}
        >
          <span>© {year} United Supply Agency</span>
          <span>GSTIN 19AACFU5394F1ZU · ISO 9001:2015 · EM-II (SSI) &amp; NSIC Unit</span>
        </div>
      </div>
    </footer>
  );
}
