/* SafariVerse — Atlas-Poster (Poster mode)
 * Single editorial composition. Cream or vintage variant.
 */

function AtlasPoster({ data, variant }) {
  const isVintage = variant === 'vintage';

  return (
    <div className={`ap-stage ${isVintage ? 'is-vintage' : ''}`}>
      <div className="ap__sidebar">
        <div className="eyebrow eyebrow--muted" style={{ marginBottom: 16 }}>Atlas-Poster</div>
        <h3 className="display display--md" style={{ margin: 0 }}>One spread.<br/>One artifact.</h3>
        <p className="caption" style={{ marginTop: 20, maxWidth: 240 }}>
          Designed to be framed, shared, saved, or downloaded as a print-ready PDF. The same composition exports as OG image, Story share, feed post, and phone wallpaper.
        </p>
        <hr className="hairline" style={{ margin: '32px 0' }} />
        <div className="ap__outputs">
          <div className="eyebrow eyebrow--muted" style={{ marginBottom: 12 }}>Outputs</div>
          {[
            ['2 : 3', 'Print poster (12 × 18 in)'],
            ['1.91 : 1', 'OG · Twitter share'],
            ['9 : 16', 'Story · Reel share'],
            ['1 : 1', 'Instagram feed'],
            ['9 : 19.5', 'Phone wallpaper'],
          ].map(([r, n]) => (
            <div className="ap__output" key={r}>
              <span className="ap__output-ratio">{r}</span>
              <span className="ap__output-name">{n}</span>
            </div>
          ))}
        </div>

        <hr className="hairline" style={{ margin: '32px 0' }} />

        <div className="ap__variant">
          <div className="eyebrow eyebrow--muted" style={{ marginBottom: 12 }}>Variant</div>
          <div className="caption">
            {isVintage ? 'Vintage Aged — warm-LUT, double rules, paper-aged ground. Used for Heritage and slow-luxury editions.' : 'Cream Cinematic (default) — paper-cream ground, single hairlines, contemporary editorial.'}
          </div>
        </div>

        <hr className="hairline" style={{ margin: '32px 0' }} />

        <button className="cta-pill" style={{ marginRight: 12 }}>
          <span className="cta-pill__glyph">↓</span>
          Download PDF
        </button>
      </div>

      <div className="ap__poster-wrap">
        <article className={`ap-poster ${isVintage ? 'is-vintage' : ''}`}>
          <div className="ap-poster__frame">

            {/* MASTHEAD */}
            <header className="ap-poster__masthead">
              <span className="ap-poster__mast-l">✦ Edition {data.number}</span>
              <span className="ap-poster__mast-c">The Honeymoon Edition</span>
              <span className="ap-poster__mast-r">{data.year} ✦</span>
            </header>
            <hr className="hairline" style={{ background: 'var(--ember-stamp)', margin: '12px 0' }} />
            {isVintage && <hr className="hairline" style={{ background: 'var(--ember-stamp)', marginBottom: 24, opacity: 0.5 }} />}

            {/* TITLE */}
            <div className="ap-poster__title-row">
              <h1 className="ap-poster__title">{data.title.split(' in ')[1] || data.title}</h1>
              <div className="ap-poster__title-side">
                <div className="caption">{data.title.split(' in ')[0]} in</div>
                <div className="ap-poster__sub">{data.subtitle}</div>
              </div>
            </div>

            {/* HERO PHOTO */}
            <figure className="ap-poster__hero">
              <div className="ap-poster__hero-photo" style={{ backgroundImage: `url('${data.hero.src}')` }} />
              {isVintage && <div className="ap-poster__lut" />}
              <div className="ap-poster__hero-frame" />
            </figure>
            <figcaption className="caption ap-poster__hero-cap">
              <span>{data.hero.caption} · Kenya</span>
              <span>photograph by {data.hero.credit}</span>
            </figcaption>

            <div className="ap-poster__body">
              {/* JOURNEY */}
              <section className="ap-poster__section">
                <SectionHead title="The Journey" />
                <ol className="ap-poster__stops">
                  {data.journey.stops.map(s => (
                    <li key={s.idx}>
                      <span className="ap-poster__stop-num">{s.idx}</span>
                      <span className="ap-poster__stop-name">{s.name}</span>
                      <span className="ap-poster__stop-note">— {s.note}</span>
                      <span className="ap-poster__stop-days">days {s.days}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* ROUTE */}
              <section className="ap-poster__section">
                <SectionHead title="Route" />
                <div className="ap-poster__route">
                  <svg viewBox="0 0 400 80" className="ap-poster__route-svg" preserveAspectRatio="none">
                    <path d="M 30 40 Q 120 10, 180 40 T 320 40 T 380 40" stroke="var(--ember-stamp)" strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
                  </svg>
                  <div className="ap-poster__route-dots">
                    {data.journey.stops.map((s, i) => (
                      <div className="ap-poster__route-dot" key={s.idx}>
                        <div className="ap-poster__route-dot-circle" />
                        <div className="ap-poster__route-dot-label">{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* INSPIRED BY */}
              <section className="ap-poster__section">
                <SectionHead title="Inspired By" />
                <div className="ap-poster__creators">
                  {data.creators.slice(0, 4).map(c => (
                    <div className="ap-poster__creator" key={c.id}>
                      <div className="ap-poster__creator-av" style={{ backgroundImage: `url('${c.avatar}')` }} />
                      <div className="ap-poster__creator-name">{c.name}</div>
                    </div>
                  ))}
                </div>
                <div className="ap-poster__films">▶ Watch the original films</div>
              </section>

              {/* STAY AT */}
              <section className="ap-poster__section">
                <SectionHead title="Stay At" />
                <div className="ap-poster__lodges">
                  {data.lodges.map((l, i) => (
                    <div className="ap-poster__lodge" key={i}>
                      <span className="ap-poster__lodge-name">{l.name}</span>
                      <span className="ap-poster__lodge-loc"> · {l.location}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ORGANIZED BY */}
              <section className="ap-poster__section ap-poster__org">
                <SectionHead title="Organized By" />
                <div className="ap-poster__org-row">
                  <div className="seal seal--filled" style={{ width: 64, height: 64 }}>SV<br/>STUDIO</div>
                  <div>
                    <div className="ap-poster__org-name">{data.organized_by.studio}</div>
                    <div className="caption">in partnership with {data.organized_by.operator}</div>
                  </div>
                </div>
              </section>
            </div>

            {/* FOOTER CTA */}
            <hr className="hairline" style={{ background: 'var(--ember-stamp)', margin: '28px 0 22px' }} />
            <footer className="ap-poster__foot">
              <div className="ap-poster__cta">
                <span className="ap-poster__cta-glyph">✦</span>
                <span className="ap-poster__cta-text">Make This Mine</span>
                <span className="ap-poster__cta-arrow">→</span>
              </div>
            </footer>

            {/* MASTHEAD ECHO */}
            <div className="ap-poster__mast-echo">
              Edition {data.number} &nbsp;·&nbsp; safariverse.com &nbsp;·&nbsp; {data.year}
            </div>

            {/* Vintage corner motif */}
            {isVintage && (
              <>
                <svg className="ap-poster__motif ap-poster__motif--tl" width="60" height="60" viewBox="0 0 60 60">
                  <path d="M 5 55 Q 25 35, 30 5 M 12 38 L 22 32 M 18 28 L 28 22 M 22 18 L 32 12" stroke="var(--ember-stamp)" strokeWidth="0.6" fill="none" />
                  <circle cx="30" cy="5" r="1.4" fill="var(--ember-stamp)" />
                </svg>
                <svg className="ap-poster__motif ap-poster__motif--br" width="60" height="60" viewBox="0 0 60 60">
                  <path d="M 55 5 Q 35 25, 30 55 M 48 22 L 38 28 M 42 32 L 32 38 M 38 42 L 28 48" stroke="var(--ember-stamp)" strokeWidth="0.6" fill="none" />
                  <circle cx="30" cy="55" r="1.4" fill="var(--ember-stamp)" />
                </svg>
              </>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

function SectionHead({ title }) {
  return (
    <div className="ap-poster__sec-head">
      <hr className="hairline" style={{ background: 'var(--ember-stamp)', width: 24, marginRight: 12, display: 'inline-block', verticalAlign: 'middle' }} />
      <span className="eyebrow" style={{ color: 'var(--ember-stamp)' }}>{title}</span>
    </div>
  );
}

window.AtlasPoster = AtlasPoster;
