/* SafariVerse — Scroll-Story (Read mode)
 * Vertical editorial long-read.
 */

function ScrollStory({ data }) {
  const heroRef = React.useRef(null);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="ss">
      {/* Hero band */}
      <div className="ss__hero" ref={heroRef}>
        <div
          className="ss__hero-photo"
          style={{
            backgroundImage: `url('${data.hero.src}')`,
            transform: `translateY(${scrollY * 0.35}px) scale(${1 + scrollY * 0.0003})`,
          }}
        />
        <div className="ss__hero-scrim" />
        <div className="ss__hero-caption">
          <span>{data.hero.caption}</span>
          <span className="ss__hero-credit">Photograph by {data.hero.credit}</span>
        </div>
      </div>

      {/* Title block */}
      <section className="ss__title">
        <div className="eyebrow" style={{ marginBottom: 24 }}>Edition {data.number}</div>
        <h1 className="display display--xxl" style={{ margin: 0 }}>{data.title}</h1>
        <hr className="hairline" style={{ width: 120, margin: '32px auto', background: 'var(--acacia-rule)' }} />
        <div className="ss__sub">{data.subtitle}</div>
        <div className="ss__byline">
          <span>Edited by <em>{data.edited_by}</em></span>
          <span className="ss__dot">·</span>
          <span>Photographs by {data.photographs_by}</span>
        </div>
      </section>

      {/* Prelude */}
      <section className="ss__prelude">
        <div className="eyebrow" style={{ marginBottom: 28 }}>The Story</div>
        <blockquote className="ss__pullquote">
          {data.prelude.pull_quote.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </blockquote>
        <div className="body-editorial ss__body">
          {data.prelude.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="ss__terminator">✦</div>
      </section>

      {/* Journey summary */}
      <section className="ss__journey">
        <div className="eyebrow" style={{ marginBottom: 32 }}>The Journey</div>
        <div className="ss__map">
          <svg viewBox="0 0 800 120" className="ss__map-svg" preserveAspectRatio="none">
            <path d="M 80 60 Q 250 30, 320 60 T 560 60 T 720 60" stroke="var(--acacia-rule)" strokeWidth="1" fill="none" strokeDasharray="3 4" />
          </svg>
          <div className="ss__stops">
            {data.journey.stops.map((s, i) => (
              <div className="ss__stop" key={s.idx}>
                <div className="ss__stop-dot" />
                <div className="ss__stop-num">{s.idx}</div>
                <div className="ss__stop-name">{s.name}</div>
                <div className="ss__stop-note">{s.note}</div>
                <div className="ss__stop-days">Days {s.days}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ss__journey-meta">
          <span>{data.days.length > 6 ? '12' : '12'} days</span>
          <span className="ss__dot">·</span>
          <span>4 stops</span>
          <span className="ss__dot">·</span>
          <span>1 dream</span>
        </div>
      </section>

      {/* Day-by-day */}
      <section className="ss__days">
        <div className="eyebrow" style={{ marginBottom: 48, textAlign: 'center' }}>Day by Day</div>
        {data.days.map((d, i) => (
          <DaySection key={d.n} day={d} flip={i % 2 === 1} aspect={['4/5', '16/9', '1/1', '4/5', '16/9', '4/5'][i % 6]} />
        ))}
      </section>

      {/* Inspired by */}
      <section className="ss__inspired">
        <div className="ss__inspired-head">
          <div className="eyebrow">Inspired By</div>
          <h2 className="display display--lg" style={{ margin: '16px 0 12px' }}>The storytellers who saw it first.</h2>
          <p className="caption" style={{ maxWidth: 480 }}>Every Edition begins with a photographer, a filmmaker, a guide. Their work shaped this journey.</p>
        </div>
        <div className="ss__creators">
          {data.creators.map(c => (
            <div className="ss__creator" key={c.id}>
              <div className="ss__creator-avatar" style={{ backgroundImage: `url('${c.avatar}')` }} />
              <div className="ss__creator-name">{c.name}</div>
              <div className="ss__creator-role">{c.role} · {c.base}</div>
              <div className="ss__creator-contrib">{c.contribution}</div>
            </div>
          ))}
        </div>
        <div className="ss__source-list">
          <div className="eyebrow" style={{ marginBottom: 20 }}>Also Referenced</div>
          {data.source_media.map((m, i) => (
            <div className="ss__source" key={i}>
              <span className="ss__source-play">▶</span>
              <span className="ss__source-title">"{m.title}"</span>
              <span className="ss__source-meta">{m.platform} · {m.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lodges */}
      <section className="ss__lodges">
        <div className="eyebrow" style={{ marginBottom: 16 }}>Places You'll Stay</div>
        <h2 className="display display--lg" style={{ margin: '0 0 56px', maxWidth: 720 }}>Four houses, kept by people who learned the land before they learned hospitality.</h2>
        <div className="ss__lodge-grid">
          {data.lodges.map((l, i) => (
            <div className="ss__lodge" key={i}>
              <div className="ss__lodge-photo" style={{ backgroundImage: `url('${l.photo}')` }} />
              <div className="ss__lodge-body">
                <div className="ss__lodge-name display display--md">{l.name}</div>
                <div className="caption" style={{ marginBottom: 16 }}>{l.location}</div>
                <p className="body-editorial" style={{ fontSize: 15 }}>{l.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Make it yours */}
      <section className="ss__make">
        <div className="ss__make-inner">
          <div className="eyebrow" style={{ marginBottom: 28 }}>Make It Yours</div>
          <blockquote className="ss__pullquote" style={{ marginBottom: 56 }}>
            "This is a dream draft.<br/>Yours can begin here."
          </blockquote>
          <div className="ss__concierge">
            <div className="ss__concierge-avatar" style={{ backgroundImage: `url('${data.concierge.avatar}')` }} />
            <div className="ss__concierge-meta">
              <div className="ss__concierge-name">{data.concierge.name}</div>
              <div className="ss__concierge-role">{data.concierge.role}</div>
            </div>
          </div>
          <p className="ss__concierge-quote">"{data.concierge.quote}"</p>
          <div className="ss__cta-row">
            <a className="cta-pill" href="#">
              <span className="cta-pill__glyph">✦</span>
              Make This Journey Mine
              <span style={{ opacity: 0.7 }}>→</span>
            </a>
            <a className="cta-ghost" href="#">Talk to Asha First →</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ss__foot">
        <hr className="hairline" />
        <div className="ss__foot-row">
          <div className="eyebrow">Organized By</div>
          <div className="ss__foot-meta">
            <div className="seal seal--filled">SV<br/>STUDIO</div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--ink-deep)' }}>{data.organized_by.studio}</div>
              <div className="caption">in partnership with {data.organized_by.operator}</div>
            </div>
          </div>
        </div>
        <hr className="hairline" />
        <div className="ss__foot-base">
          <span>Edition {data.number} · {data.year}</span>
          <span>safariverse.com/editions/{data.id}</span>
        </div>
      </footer>
    </div>
  );
}

function DaySection({ day, flip, aspect }) {
  return (
    <article className={`ss__day ${flip ? 'is-flipped' : ''}`}>
      <aside className="ss__day-side">
        <div className="ss__day-ordinal ordinal">{day.n}</div>
        <div className="eyebrow" style={{ marginTop: 16 }}>Day {parseInt(day.n)}</div>
        <hr className="hairline" style={{ width: 60, margin: '16px 0', background: 'var(--acacia-rule)' }} />
        <div className="ss__day-stamp">{day.title.toUpperCase()}</div>
        <div className="ss__day-sub">{day.sub}</div>
      </aside>
      <div className="ss__day-main">
        <div className="ss__day-photo" style={{ backgroundImage: `url('${day.photo}')`, aspectRatio: aspect }} />
        <div className="caption ss__day-caption">
          {day.photo_caption} &nbsp;·&nbsp; photo by {day.photo_credit}
        </div>
        <div className="body-editorial">
          <p>{day.narrative}</p>
          {day.narrative_2 && <p>{day.narrative_2}</p>}
        </div>
        <div className="ss__day-lodge">
          <div className="eyebrow" style={{ marginBottom: 6 }}>The Lodge</div>
          <div className="ss__day-lodge-line">
            <span className="ss__day-lodge-name">{day.lodge.name}</span>
            <span className="ss__dot">·</span>
            <span>{day.lodge.location}</span>
          </div>
        </div>

        {(day.reel || day.blog || day.credits || day.reviews) && (
          <div className="ss__attr">
            <div className="ss__attr-head">
              <span className="ss__attr-mark">✦</span>
              <span className="ss__attr-eyebrow">Sources &amp; Attribution</span>
              <hr className="hairline" style={{ flex: 1, background: 'var(--acacia-rule)', margin: '0 0 0 14px' }} />
            </div>

            <div className="ss__attr-grid">
              {day.reel && (
                <div className="ss__attr-col ss__attr-col--reel">
                  <div className="ss__attr-sub-eyebrow">Watch</div>
                  <ReelEmbed reel={day.reel} compact />
                </div>
              )}

              {day.blog && (
                <a className="ss__attr-col ss__attr-col--blog" href="#">
                  <div className="ss__attr-sub-eyebrow">Read</div>
                  <div className="ss__attr-blog-mini">
                    <div className="ss__attr-blog-cover" style={{ backgroundImage: `url('${day.blog.cover}')` }}>
                      <span className="ss__attr-blog-tag">{day.blog.eyebrow}</span>
                    </div>
                    <div className="ss__attr-blog-info">
                      <div className="ss__attr-blog-title">{day.blog.title}</div>
                      <div className="ss__attr-blog-meta">by <strong>{day.blog.author}</strong> · {day.blog.read_time}</div>
                    </div>
                  </div>
                </a>
              )}

              {day.credits && day.credits.length > 0 && (
                <div className="ss__attr-col">
                  <div className="ss__attr-sub-eyebrow">Accreditations</div>
                  <dl className="ss__credits-list">
                    {day.credits.map((c, i) => (
                      <div className="ss__credit" key={i}>
                        <dt>{c.role}</dt>
                        <dd>
                          <span className="ss__credit-name">{c.name}</span>
                          {c.platform && <span className="ss__credit-platform"> · {c.platform}</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {day.reviews && day.reviews.length > 0 && (
                <div className="ss__attr-col">
                  <div className="ss__attr-sub-eyebrow">Travellers Say</div>
                  <div className="ss__reviews">
                    {day.reviews.map((r, i) => <ReviewChip key={i} review={r} />)}
                  </div>
                  <div className="ss__reviews-foot">
                    <strong>{day.lodge.name}</strong> verified reviews
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function ReviewChip({ review }) {
  const fullStars = Math.floor(review.score);
  const halfStar = review.score - fullStars >= 0.5;
  const formatCount = n => n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : n.toLocaleString();

  // Platform letter + brand color (editorial — not real logos)
  const platformMeta = {
    'TripAdvisor': { letter: 'TA', color: '#0E7C66' },
    'Google':      { letter: 'G',  color: '#1A1815' },
    'Booking.com': { letter: 'B',  color: '#003580' },
  }[review.platform] || { letter: review.platform[0], color: 'var(--ink-deep)' };

  return (
    <div className="ss__review">
      <div className="ss__review-platform-mark" style={{ background: platformMeta.color }}>
        {platformMeta.letter}
      </div>
      <div className="ss__review-body">
        <div className="ss__review-top">
          <span className="ss__review-platform">{review.platform}</span>
          <span className="ss__review-score">{review.score.toFixed(1)}</span>
        </div>
        <div className="ss__review-stars">
          {[0, 1, 2, 3, 4].map(i => (
            <span key={i} className={`ss__star ${i < fullStars ? 'is-full' : (i === fullStars && halfStar ? 'is-half' : '')}`}>★</span>
          ))}
          <span className="ss__review-count">{formatCount(review.count)} reviews</span>
        </div>
        {review.label && <div className="ss__review-label">{review.label}</div>}
      </div>
    </div>
  );
}

function ReelEmbed({ reel }) {
  const ref = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);

  // total seconds from "m:ss"
  const totalSec = React.useMemo(() => {
    const [m, s] = reel.duration.split(':').map(Number);
    return m * 60 + s;
  }, [reel.duration]);

  // IntersectionObserver — auto-play when ~30% in view
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => setPlaying(e.intersectionRatio > 0.3)),
      { threshold: [0, 0.3, 0.6, 1] }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // tick simulated playback
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed(e => (e + 1) % (totalSec + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [playing, totalSec]);

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const progressPct = (elapsed / totalSec) * 100;

  return (
    <figure className={`ss__reel ${playing ? 'is-playing' : ''}`} ref={ref}>
      <div className="ss__reel-frame">
        <div className="ss__reel-sprocket ss__reel-sprocket--top">
          {[...Array(18)].map((_, i) => <span key={i} />)}
        </div>
        <div className="ss__reel-sprocket ss__reel-sprocket--bottom">
          {[...Array(18)].map((_, i) => <span key={i} />)}
        </div>
        <div className="ss__reel-screen">
          <div className="ss__reel-thumb" style={{ backgroundImage: `url('${reel.thumbnail}')` }} />
          <div className="ss__reel-vignette" />

          <div className="ss__reel-overlay">
            <div className="ss__reel-overlay-l">
              <span className="ss__reel-live">
                <span className={`ss__reel-dot ${playing ? 'is-on' : ''}`} />
                {playing ? 'Now playing' : 'Tap to play'}
              </span>
              <div className="ss__reel-title">{reel.title}</div>
              <div className="ss__reel-creator">
                {reel.creator_handle} <span className="ss__dot" style={{ margin: '0 6px' }}>·</span> {reel.platform}
              </div>
            </div>
            <div className="ss__reel-overlay-r">
              <div className="ss__reel-time">
                <span className="ss__reel-elapsed">{fmt(elapsed)}</span>
                <span className="ss__reel-total"> / {reel.duration}</span>
              </div>
              {!playing && (
                <div className="ss__reel-play-btn">▶</div>
              )}
            </div>
          </div>

          <div className="ss__reel-progress">
            <div className="ss__reel-progress-bar" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>
      <figcaption className="ss__reel-cap">
        <span className="ss__source-play">▶</span>
        <span>Inspired by <strong>{reel.creator_name}</strong>'s reel that informed this day</span>
      </figcaption>
    </figure>
  );
}

function BlogCard({ blog }) {
  return (
    <a className="ss__blog" href="#">
      <div className="ss__blog-cover" style={{ backgroundImage: `url('${blog.cover}')` }}>
        <span className="ss__blog-eyebrow">{blog.eyebrow}</span>
      </div>
      <div className="ss__blog-body">
        <h4 className="ss__blog-title">{blog.title}</h4>
        <div className="ss__blog-meta">
          <span>by <strong>{blog.author}</strong></span>
          <span className="ss__dot">·</span>
          <span>{blog.date}</span>
          <span className="ss__dot">·</span>
          <span>{blog.read_time}</span>
        </div>
        <div className="ss__blog-cta">Read the field journal <span style={{ marginLeft: 6 }}>→</span></div>
      </div>
    </a>
  );
}

window.ScrollStory = ScrollStory;
