'use client';

import TransitionLink from '@/components/TransitionLink';
import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { useEnquiry } from '@/context/EnquiryContext';

const CONTACT_ROWS = [
  { label: 'Phone', lines: [{ text: '+91 94325 69419', href: 'tel:+919432569419' }, { text: '+91 87772 01678', href: 'tel:+918777201678' }] },
  { label: 'Email', lines: [{ text: 'unitedsupplyagency@gmail.com', href: 'mailto:unitedsupplyagency@gmail.com' }] },
  { label: 'Office', lines: [{ text: '28/C Christopher Road, Kolkata 700046', href: 'https://maps.google.com/?q=28C+Christopher+Road+Kolkata+700046' }] },
  { label: 'Factory', lines: [{ text: 'Village Garbalia, Para Manna Para, Jagatballavpur, Howrah 711410', href: 'https://maps.google.com/?q=Jagatballavpur+Howrah+711410' }] },
  { label: 'GSTIN', lines: [{ text: '19AACFU5394F1ZU', href: '#' }] },
];

type FormState = { name: string; company: string; email: string; phone: string; msg: string };

export default function ContactClient() {
  const { items, setQty } = useEnquiry();
  const [form, setForm] = useState<FormState>({ name: '', company: '', email: '', phone: '', msg: '' });
  const [sendNote, setSendNote] = useState('');
  const [sendErr, setSendErr] = useState(false);
  const [copied, setCopied] = useState(false);

  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const lines = items.map((item, k) => `${k + 1}. ${item.name} (Item No. ${item.num}) — Qty: ${item.qty}`);
  const body = [
    'Hello United Supply Agency,',
    '',
    'Please send a quotation for the following:',
    '',
    'ENQUIRY LIST',
    ...(lines.length ? lines : ['(no catalogue items selected)']),
    '',
    ...(form.msg ? ['MESSAGE', form.msg, ''] : []),
    'CONTACT DETAILS',
    `Name: ${form.name || '-'}`,
    `Company: ${form.company || '-'}`,
    `Email: ${form.email || '-'}`,
    `Phone: ${form.phone || '-'}`,
  ].join('\n');
  const subject = 'Quotation request' + (form.company ? ' — ' + form.company : '');
  const mailHref = `mailto:unitedsupplyagency@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const waHref = `https://api.whatsapp.com/send?phone=918777201678&text=${encodeURIComponent(body)}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=unitedsupplyagency@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const valid = () => {
    if (!form.name.trim() || (!form.email.trim() && !form.phone.trim())) {
      setSendNote('Please add your name and an email or phone number so we can reply.');
      setSendErr(true);
      return false;
    }
    if (!items.length && !form.msg.trim()) {
      setSendNote('Add at least one part from the catalogue, or write a message.');
      setSendErr(true);
      return false;
    }
    return true;
  };

  const openOut = (url: string, e: React.MouseEvent, label: string) => {
    e.preventDefault();
    if (!valid()) return;
    let w: Window | null = null;
    try {
      w = window.open(url, '_blank', 'noopener');
    } catch {
      /* popup blocked */
    }
    if (!w) {
      try {
        window.top!.location.href = url;
      } catch {
        location.href = url;
      }
    }
    setSendNote(label);
    setSendErr(false);
  };

  const sendMail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!valid()) return;
    const a = document.createElement('a');
    a.href = mailHref;
    a.target = '_top';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setSendNote('Your email app should open with the enquiry filled in. Press send there.');
    setSendErr(false);
  };
  const sendWa = (e: React.MouseEvent) => openOut(waHref, e, 'WhatsApp is opening in a new tab with your enquiry. Press send there.');
  const sendGmail = (e: React.MouseEvent) => openOut(gmailHref, e, 'Gmail is opening in a new tab with your enquiry filled in.');

  const copyMsg = () => {
    const t = 'To: unitedsupplyagency@gmail.com\nSubject: ' + subject + '\n\n' + body;
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(
      () => setCopied(true),
      () => {
        const ta = document.createElement('textarea');
        ta.value = t;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
        } catch {
          /* clipboard unavailable */
        }
        ta.remove();
        setCopied(true);
      }
    );
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ padding: 'clamp(56px,7vw,96px) 0 clamp(70px,9vw,120px)' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 clamp(20px,4vw,48px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: 'clamp(40px,6vw,88px)',
            alignItems: 'start',
          }}
        >
          <div>
            <Reveal as="p" style={{ margin: '0 0 18px', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Contact
            </Reveal>
            <Reveal
              as="h1"
              delay={80}
              style={{ margin: 0, fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(40px,5.6vw,76px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Request a quote.
            </Reveal>
            <Reveal as="p" delay={160} style={{ margin: '22px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '40ch' }}>
              Tell us the parts, quantities and relay type. Attach drawings when you send the email.
            </Reveal>
            <div style={{ marginTop: 48, display: 'grid', gap: 0, borderTop: '1px solid var(--ink)' }}>
              {CONTACT_ROWS.map((row, i) => (
                <Reveal
                  key={row.label}
                  delay={i * 60}
                  style={{ display: 'grid', gridTemplateColumns: 'minmax(72px,110px) minmax(0,1fr)', gap: 12, padding: '18px 0', borderBottom: '1px solid var(--line)' }}
                >
                  <span style={{ fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: 3 }}>{row.label}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {row.lines.map((l) => (
                      <a key={l.text} href={l.href} style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--ink)', wordBreak: 'break-word' }}>
                        {l.text}
                      </a>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 8, padding: 'clamp(22px,3vw,36px)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 24, letterSpacing: '-0.01em' }}>
                Enquiry list
              </h2>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                {items.length ? `${items.length} ${items.length === 1 ? 'part' : 'parts'}` : ''}
              </span>
            </div>

            {items.length === 0 && (
              <div style={{ marginTop: 16, padding: 22, border: '1px dashed var(--line)', borderRadius: 6, fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
                No parts added yet.{' '}
                <TransitionLink href="/products" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  Browse the catalogue
                </TransitionLink>{' '}
                and tap &ldquo;Add to enquiry&rdquo;.
              </div>
            )}

            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' }}>
              {items.map((item) => (
                <div key={item.n} className="enquiry-row" style={{ alignItems: 'center', borderBottom: '1px solid var(--line-2)' }}>
                  <span style={{ gridArea: 'num', fontSize: 12, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{item.num}</span>
                  <span style={{ gridArea: 'name', fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{item.name}</span>
                  <div
                    style={{
                      gridArea: 'qty',
                      justifySelf: 'start',
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--line)',
                      borderRadius: 999,
                      background: 'var(--paper)',
                    }}
                  >
                    <button
                      onClick={() => setQty(item.n, item.qty - 1)}
                      aria-label="Decrease"
                      style={{ border: 0, background: 'none', width: 30, height: 30, cursor: 'pointer', fontSize: 15 }}
                    >
                      −
                    </button>
                    <input
                      value={item.qty}
                      onChange={(e) => {
                        const v = parseInt(e.target.value.replace(/\D/g, ''), 10);
                        setQty(item.n, isNaN(v) ? 1 : Math.max(1, v));
                      }}
                      aria-label="Quantity"
                      style={{ width: 56, border: 0, background: 'none', textAlign: 'center', fontSize: 13, fontVariantNumeric: 'tabular-nums', outline: 'none' }}
                    />
                    <button
                      onClick={() => setQty(item.n, item.qty + 1)}
                      aria-label="Increase"
                      style={{ border: 0, background: 'none', width: 30, height: 30, cursor: 'pointer', fontSize: 15 }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => setQty(item.n, 0)}
                    aria-label="Remove"
                    className="remove-btn"
                    style={{ gridArea: 'rm', justifySelf: 'end', border: 0, background: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 13, padding: 4 }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
                Your name
                <input value={form.name} onChange={field('name')} className="focus-ink" style={inputStyle} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
                Company
                <input value={form.company} onChange={field('company')} className="focus-ink" style={inputStyle} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
                Email
                <input type="email" value={form.email} onChange={field('email')} className="focus-ink" style={inputStyle} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
                Phone
                <input type="tel" value={form.phone} onChange={field('phone')} className="focus-ink" style={inputStyle} />
              </label>
            </div>
            <label style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
              Message, relay type or drawing numbers
              <textarea value={form.msg} onChange={field('msg')} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            </label>

            <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a
                href={mailHref}
                onClick={sendMail}
                className="cta-lift"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 22px',
                  borderRadius: 999,
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'transform .25s ease',
                }}
              >
                Send by email <span aria-hidden="true">→</span>
              </a>
              <a
                href={waHref}
                onClick={sendWa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-invert"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 22px', borderRadius: 999, border: '1px solid var(--ink)', color: 'var(--ink)', fontSize: 14, fontWeight: 500, transition: 'background .25s ease,color .25s ease' }}
              >
                Send on WhatsApp
              </a>
            </div>

            {sendNote && (
              <p style={{ margin: '14px 0 0', fontSize: 13, lineHeight: 1.5, color: sendErr ? '#b4532a' : 'var(--ink-soft)' }}>{sendNote}</p>
            )}

            <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: '6px 18px', fontSize: 12.5, color: 'var(--muted)' }}>
              <span>Email not opening?</span>
              <a href={gmailHref} onClick={sendGmail} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Open in Gmail
              </a>
              <button onClick={copyMsg} style={{ border: 0, background: 'none', padding: 0, color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer', fontSize: 12.5 }}>
                {copied ? 'Copied ✓' : 'Copy message'}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '11px 12px',
  border: '1px solid var(--line)',
  borderRadius: 4,
  background: 'var(--paper)',
  fontSize: 14,
  outline: 'none',
  color: 'var(--ink)',
};
