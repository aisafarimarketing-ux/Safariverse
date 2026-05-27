/* SafariVerse — Edition app shell with mode switching + Tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "posterVariant": "cream",
  "groundMode": "paper"
}/*EDITMODE-END*/;

function EditionApp() {
  const t = useTweaks(TWEAK_DEFAULTS);
  const [mode, setMode] = React.useState('read'); // read | lookbook | poster
  const [shrunk, setShrunk] = React.useState(false);
  const data = window.EDITION;

  React.useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset scroll on mode change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [mode]);

  const isDark = mode !== 'read';

  return (
    <div className={`app ${isDark ? 'dark' : ''}`} data-mode={mode}>
      {/* Top chrome */}
      <header className={`ed-top ${shrunk ? 'is-shrunk' : ''} ${isDark ? 'is-dark' : ''}`}>
        <div className="ed-top__left">
          <a href="index.html" className="ed-top__back" aria-label="Back to landing">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </a>
          <a href="index.html" className="ed-top__wordmark">SafariVerse<sup>✦</sup></a>
          <span className="ed-top__sep">/</span>
          <span className="ed-top__crumb">Edition {data.number}</span>
        </div>

        <ModeSwitch mode={mode} setMode={setMode} />

        <div className="ed-top__right">
          <button className="ed-top__icon" title="Save">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
          </button>
          <button className="ed-top__icon" title="Share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mode content */}
      <main className="ed-main">
        {mode === 'read'     && <ScrollStory data={data} />}
        {mode === 'lookbook' && <Flipbook data={data} />}
        {mode === 'poster'   && <AtlasPoster data={data} variant={t.posterVariant} />}
      </main>

      {/* Sticky bottom CTA on Read mode only */}
      {mode === 'read' && shrunk && (
        <div className="ed-sticky-cta">
          <span className="caption" style={{ marginRight: 16 }}>Edition {data.number} · {data.title}</span>
          <a className="cta-pill" href="#">
            <span className="cta-pill__glyph">✦</span>
            Make This Mine
            <span style={{ opacity: 0.7 }}>→</span>
          </a>
        </div>
      )}

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Atlas-Poster Variant" caption="Cream is the contemporary editorial default. Vintage adds warm LUT, double rules, paper-aged ground, and a small botanical motif.">
          <TweakRadio
            value={t.posterVariant}
            onChange={v => t.setTweak('posterVariant', v)}
            options={[
              { value: 'cream', label: 'Cream' },
              { value: 'vintage', label: 'Vintage' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Try the modes" caption="Switch between Read, Lookbook, and Poster from the pill in the top bar — same data, three presentations.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12, color: 'var(--ink-soft)' }}>
            <div><strong style={{ color: 'var(--ink-bright)' }}>◐ Read</strong> — vertical editorial long-read</div>
            <div><strong style={{ color: 'var(--ink-bright)' }}>▣ Lookbook</strong> — cinematic page-turn (← → keys)</div>
            <div><strong style={{ color: 'var(--ink-bright)' }}>✦ Poster</strong> — single composition (try Vintage above)</div>
          </div>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function ModeSwitch({ mode, setMode }) {
  const modes = [
    { id: 'read',     glyph: '◐', label: 'Read' },
    { id: 'lookbook', glyph: '▣', label: 'Lookbook' },
    { id: 'poster',   glyph: '✦', label: 'Poster' },
  ];
  return (
    <div className="mode-pill" role="tablist">
      {modes.map(m => (
        <button
          key={m.id}
          className={mode === m.id ? 'is-active' : ''}
          onClick={() => setMode(m.id)}
          role="tab"
          aria-selected={mode === m.id}
        >
          <span style={{ fontSize: 12 }}>{m.glyph}</span>
          {m.label}
        </button>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EditionApp />);
