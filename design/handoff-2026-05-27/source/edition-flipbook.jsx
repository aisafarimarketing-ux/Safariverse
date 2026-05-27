/* SafariVerse — Flipbook (Lookbook mode)
 * Cinematic page-turn lookbook with 3D rotateY transitions.
 */

function Flipbook({ data }) {
  // Build spread list: cover, prelude, day spreads, inspirations, make-it-yours, back
  const spreads = React.useMemo(() => {
    const list = [{ type: 'cover' }, { type: 'prelude' }];
    data.days.forEach(d => list.push({ type: 'day', day: d }));
    list.push({ type: 'inspirations' });
    list.push({ type: 'make' });
    list.push({ type: 'back' });
    return list;
  }, [data]);

  const [idx, setIdx] = React.useState(0);
  const [direction, setDirection] = React.useState('next');
  const total = spreads.length;

  const go = (target) => {
    if (target < 0 || target >= total || target === idx) return;
    setDirection(target > idx ? 'next' : 'prev');
    setIdx(target);
  };

  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx]);

  return (
    <div className="fb">
      <div className="fb__stage">
        <div className="fb__edge fb__edge--left" onClick={() => go(idx - 1)} aria-label="Previous spread">
          <span>‹</span>
        </div>
        <div className="fb__edge fb__edge--right" onClick={() => go(idx + 1)} aria-label="Next spread">
          <span>›</span>
        </div>

        <div className="fb__book">
          {spreads.map((s, i) => (
            <div
              key={i}
              className={`fb__spread ${i === idx ? 'is-current' : ''} ${i < idx ? 'is-past' : ''} ${i > idx ? 'is-future' : ''}`}
              style={{ zIndex: i === idx ? 10 : (i < idx ? 5 - (idx - i) : 5 - (i - idx)) }}
            >
              <SpreadRenderer spread={s} data={data} pageNumber={i + 1} total={total} />
            </div>
          ))}
        </div>
      </div>

      <div className="fb__controls">
        <div className="fb__page-num">
          <span className="ordinal" style={{ fontSize: 28, color: 'var(--ember-stamp)' }}>{String(idx + 1).padStart(2, '0')}</span>
          <span className="caption" style={{ color: 'rgba(245,241,234,0.6)' }}>&nbsp;/&nbsp;{String(total).padStart(2, '0')}</span>
        </div>
        <div className="fb__dots">
          {spreads.map((_, i) => (
            <button key={i} className={`fb__dot ${i === idx ? 'is-active' : ''}`} onClick={() => go(i)} aria-label={`Spread ${i+1}`} />
          ))}
        </div>
        <div className="fb__hint">
          {idx === 0 ? '← swipe to turn' : (idx === total - 1 ? 'end of edition' : 'arrow keys ↔')}
        </div>
      </div>
    </div>
  );
}

function SpreadRenderer({ spread, data, pageNumber, total }) {
  switch (spread.type) {
    case 'cover':       return <CoverSpread data={data} />;
    case 'prelude':     return <PreludeSpread data={data} pageNumber={pageNumber} total={total} />;
    case 'day':         return <DaySpread day={spread.day} pageNumber={pageNumber} total={total} />;
    case 'inspirations':return <InspirationsSpread data={data} pageNumber={pageNumber} total={total} />;
    case 'make':        return <MakeItYoursSpread data={data} pageNumber={pageNumber} total={total} />;
    case 'back':        return <BackSpread data={data} />;
    default: return null;
  }
}

function PageNumber({ n, total }) {
  return (
    <div className="fb__pnum">
      <span>{String(n).padStart(2, '0')}</span>
      <span style={{ opacity: 0.4 }}> / {String(total).padStart(2, '0')}</span>
    </div>
  );
}

function CoverSpread({ data }) {
  return (
    <div className="fb-page fb-page--cover">
      <div className="fb-cover__photo" style={{ backgroundImage: `url('${data.hero.src}')` }} />
      <div className="fb-cover__scrim" />
      <div className="fb-cover__masthead">SafariVerse <span style={{ opacity:0.5, margin:'0 12px' }}>·</span> Edition {data.number}</div>
      <div className="fb-cover__center">
        <div style={{ position: 'relative', display: 'inline-block', padding: '32px 0' }}>
          <h1 className="display display--xxl fb-cover__title">{data.title}</h1>
        </div>
        <div className="fb-cover__sub">{data.subtitle}</div>
        <hr className="hairline" style={{ width: 96, margin: '36px auto', background: 'rgba(245,241,234,0.6)' }} />
        <div className="fb-cover__byline">
          Edited by <em>{data.edited_by}</em> &nbsp;·&nbsp; Photographs by {data.photographs_by}
        </div>
      </div>
      <div className="fb-cover__foot">
        <div className="caption" style={{ color: 'rgba(245,241,234,0.55)' }}>
          {data.hero.caption} &nbsp;·&nbsp; photo by {data.hero.credit}
        </div>
      </div>
    </div>
  );
}

function PreludeSpread({ data, pageNumber, total }) {
  return (
    <div className="fb-page fb-page--paper">
      <div className="fb-page__inner fb-prelude">
        <div className="eyebrow" style={{ marginBottom: 48 }}>The Story</div>
        <blockquote className="fb-prelude__quote">
          {data.prelude.pull_quote.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </blockquote>
        <div className="body-editorial fb-prelude__body">
          {data.prelude.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="fb-prelude__terminator">✦</div>
      </div>
      <PageNumber n={pageNumber} total={total} />
    </div>
  );
}

function DaySpread({ day, pageNumber, total }) {
  return (
    <div className="fb-page fb-page--paper">
      <div className="fb-page__inner fb-day">
        <header className="fb-day__head">
          <div className="ordinal fb-day__ord">{day.n}</div>
          <div className="fb-day__head-right">
            <div className="eyebrow">Day {parseInt(day.n)}</div>
            <hr className="hairline" style={{ background: 'var(--acacia-rule)', width: 80, margin: '12px 0' }} />
          </div>
        </header>

        <h2 className="display display--xl fb-day__title">{day.title}</h2>
        <div className="fb-day__sub">— {day.sub}</div>

        <div className="fb-day__photo-wrap">
          <div className="fb-day__photo" style={{ backgroundImage: `url('${day.photo}')` }} />
        </div>
        <div className="caption fb-day__cap">{day.photo_caption} · photo by {day.photo_credit}</div>

        <div className="fb-day__cols">
          <div className="body-editorial">
            <p>{day.narrative}</p>
            {day.narrative_2 && <p>{day.narrative_2}</p>}
          </div>
          <aside className="fb-day__lodge">
            <div className="eyebrow eyebrow--muted">The Lodge</div>
            <hr className="hairline" style={{ background: 'var(--acacia-rule)', width: 30, margin: '10px 0 14px' }} />
            <div className="fb-day__lodge-name">{day.lodge.name}</div>
            <div className="caption">{day.lodge.location}</div>
            {day.inspired_by && (
              <>
                <hr className="hairline" style={{ margin: '24px 0' }} />
                <div className="eyebrow eyebrow--muted" style={{ marginBottom: 10 }}>As Seen On</div>
                <div className="fb-day__inspired">
                  <span className="fb-day__play">▶</span>
                  <span>Watch <strong>{day.inspired_by}</strong>'s reel<br/><span className="caption">that inspired this day</span></span>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
      <PageNumber n={pageNumber} total={total} />
    </div>
  );
}

function InspirationsSpread({ data, pageNumber, total }) {
  return (
    <div className="fb-page fb-page--paper">
      <div className="fb-page__inner">
        <div className="eyebrow" style={{ marginBottom: 24 }}>Inspired By</div>
        <h2 className="display display--xl" style={{ margin: '0 0 16px', maxWidth: 640 }}>The storytellers whose work shaped this journey.</h2>
        <p className="body-editorial" style={{ fontSize: 15, maxWidth: 520, marginBottom: 56 }}>
          Every Edition begins with someone's eye on the land. We credit theirs — beautifully.
        </p>

        <div className="fb-insp__grid">
          {data.creators.map(c => (
            <div className="fb-insp__creator" key={c.id}>
              <div className="fb-insp__avatar" style={{ backgroundImage: `url('${c.avatar}')` }} />
              <div className="fb-insp__name">{c.name}</div>
              <div className="caption">{c.role} · {c.base}</div>
              <div className="fb-insp__contrib">{c.contribution}</div>
            </div>
          ))}
        </div>

        <hr className="hairline" style={{ background: 'var(--acacia-rule)', margin: '48px 0 24px' }} />

        <div className="fb-insp__source">
          <div className="eyebrow eyebrow--muted" style={{ marginBottom: 18 }}>Also Referenced</div>
          {data.source_media.map((m, i) => (
            <div className="fb-insp__source-row" key={i}>
              <span className="fb-day__play">▶</span>
              <span style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 16 }}>"{m.title}"</span>
              <span className="caption" style={{ marginLeft: 'auto' }}>{m.platform} · {m.year}</span>
            </div>
          ))}
        </div>
      </div>
      <PageNumber n={pageNumber} total={total} />
    </div>
  );
}

function MakeItYoursSpread({ data, pageNumber, total }) {
  return (
    <div className="fb-page fb-page--paper">
      <div className="fb-page__inner fb-make">
        <div className="eyebrow" style={{ marginBottom: 40 }}>Make It Yours</div>
        <blockquote className="fb-make__quote">
          "This is a dream draft.<br/>Yours can begin here."
        </blockquote>

        <div className="fb-make__concierge">
          <div className="fb-make__avatar" style={{ backgroundImage: `url('${data.concierge.avatar}')` }} />
          <div className="fb-make__c-name">{data.concierge.name}</div>
          <div className="caption">{data.concierge.role}</div>
        </div>

        <p className="fb-make__c-quote">"{data.concierge.quote}"</p>

        <div className="fb-make__cta-row">
          <a className="cta-pill" href="#">
            <span className="cta-pill__glyph">✦</span>
            Make This Journey Mine
            <span style={{ opacity: 0.7 }}>→</span>
          </a>
        </div>
        <a className="fb-make__secondary" href="#">or ↗ talk to {data.concierge.name.split(' ')[0]} first</a>

        <hr className="hairline" style={{ background: 'var(--acacia-rule)', margin: '64px 0 24px', width: 240 }} />

        <div className="fb-make__org">
          <div className="seal seal--filled">SV<br/>STUDIO</div>
          <div>
            <div className="eyebrow eyebrow--muted" style={{ marginBottom: 6 }}>Organized By</div>
            <div className="fb-make__org-line">{data.organized_by.studio}</div>
            <div className="caption">in partnership with {data.organized_by.operator}</div>
          </div>
        </div>
      </div>
      <PageNumber n={pageNumber} total={total} />
    </div>
  );
}

function BackSpread({ data }) {
  return (
    <div className="fb-page fb-page--back">
      <div className="fb-back__inner">
        <div className="seal" style={{ width: 100, height: 100, fontSize: 11, color: 'var(--ember)', borderColor: 'var(--ember)' }}>
          EDITION<br/>{data.number}
        </div>
        <div className="display display--md" style={{ color: 'var(--ink-bright)', marginTop: 40, letterSpacing: '0.04em' }}>SafariVerse</div>
        <div className="caption" style={{ color: 'rgba(245,241,234,0.55)', marginTop: 12 }}>safariverse.com/editions/{data.id}</div>
        <hr className="hairline hairline--dark" style={{ width: 200, margin: '40px 0' }} />
        <div className="caption" style={{ color: 'rgba(245,241,234,0.5)' }}>© {data.year} SafariVerse Studio · All photography credited to its creators.</div>
      </div>
    </div>
  );
}

window.Flipbook = Flipbook;
