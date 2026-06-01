import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ccmunLogo from '/assets/ccmun-logo.png'
import cchmLogo from '/assets/CCHM-logo.png'
import ImageSlot from '../components/ImageSlot'
import useScrollReveal from '../hooks/useScrollReveal'

const CONFERENCES = [
  { ord: 'First · CCMUN I', yr: '2023', goh: 'Ms Olivia Tan Jia Yi', sub: 'Senior Geopolitical Risk Consultant, Expeditors International · Alumnus' },
  { ord: 'Second · CCMUN II', yr: '2024', goh: 'Ms Ann Neo Zixin', sub: 'Journalist, The Straits Times', delay: 'd1' },
  { ord: 'Third · CCMUN III', yr: '2025', goh: 'Prof Kishore Mahbubani', sub: 'Distinguished Fellow, Asia Research Institute, NUS', delay: 'd2' },
  { ord: 'Fourth · CCMUN IV', yr: '2026', goh: 'Ms Liew Wei Lin', sub: 'Assistant Director, MFA Singapore', delay: 'd3' },
]

export default function Home() {
  useScrollReveal()
  useEffect(() => { document.title = 'CCMUN — A Memory · 2022–2026' }, [])

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-year">'22—'26</div>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px,3vw,32px)' }}>
            <img className="hero-logo" src={ccmunLogo} alt="CCMUN phoenix" />
            <img className="hero-logo" src={cchmLogo} alt="Chung Cheng High School" style={{ width: 'clamp(60px,9vw,96px)' }} />
          </div>
          <span className="eyebrow">Chung Cheng High School (Main)</span>
          <h1>CCMUN</h1>
          <p className="hero-sub">
            Four years ago, it began as a <b>wild, reckless idea</b> between friends.
            This is where we keep what it became.
          </p>
          <span className="tag-pill"><span className="dot" />Delegates of Today, Leaders of Tomorrow.</span>
          <div className="arc-row">
            <span className="yr">2022</span><span className="ln" /><span className="yr">2026</span>
          </div>
          <div className="hero-cta">
            <Link to="/history" className="btn">Walk through our story <span className="arr">→</span></Link>
            <Link to="/people" className="btn ghost">Meet the people</Link>
          </div>
        </div>
        <div className="scrollcue"><span>Begin</span><span className="l" /></div>
      </section>

      {/* INTRO */}
      <section className="pad">
        <div className="wrap intro-grid">
          <div className="reveal">
            <span className="eyebrow">What we were</span>
            <p className="big" style={{ margin: '18px 0 26px' }}>
              One of Chung Cheng's signature Stretch Week activities, built for students who walk in
              knowing <em>nothing</em> about diplomacy and walk out unable to stop talking about the world.
            </p>
            <p>From a single idea in 2022, CCMUN became a place of discovery. Delegates arrived curious and left confident, having debated real crises, represented real nations, and found a voice they never knew they had.</p>
            <p>We stayed up too late printing placards. We argued. We listened. And somewhere between the first gavel and the last, a room full of beginners became leaders worth remembering.</p>
          </div>
          <div className="reveal d2 intro-photo">
            <div className="mat">
              <ImageSlot id="home-intro-1" placeholder="Drop a conference photo" style={{ aspectRatio: '4/3', width: '100%' }} />
            </div>
            <div className="mat">
              <ImageSlot id="home-intro-2" placeholder="Candid moment" style={{ aspectRatio: '1/1', width: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CONFERENCES TEASER */}
      <section className="pad-sm">
        <div className="wrap">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 34 }}>
            <div>
              <span className="eyebrow">Four gavels</span>
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: 14, letterSpacing: '-.03em' }}>Every year, a new beginning.</h2>
            </div>
            <Link to="/history" className="btn ghost">See the full timeline →</Link>
          </div>
          <div className="confs">
            {CONFERENCES.map(({ ord, yr, goh, sub, delay }) => (
              <div key={yr} className={`conf reveal${delay ? ' ' + delay : ''}`}>
                <span className="ord">{ord}</span>
                <span className="yr">{yr}</span>
                <span className="goh-l">Guest of Honour</span>
                <span className="goh">{goh}<small>{sub}</small></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <section className="qband pad">
        <img className="wm" src={ccmunLogo} alt="" />
        <div className="wrap">
          <div className="qmark reveal">&ldquo;</div>
          <blockquote className="reveal d1">This is your legacy, your gift to your juniors... that experience of planning, debates, critical thinking, brain work and still having much fun while being mentally exhausted!</blockquote>
          <span className="qby reveal d2">— our Teacher-in-Charge, Ms Chan Ann Chin Valerie (HOD / Humanities)</span>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="pad">
        <div className="wrap endcta reveal">
          {/* <img src={ccmunLogo} alt="" style={{ width: 64, height: 64, objectFit: 'contain' }} /> */}
          <h2>Behind every gavel were the <em>people</em> who made it rise.</h2>
          <div className="hero-cta">
            <Link to="/people" className="btn">Meet the Desk &amp; Chairs <span className="arr">→</span></Link>
            <Link to="/thanks" className="btn ghost">A note of thanks</Link>
          </div>
        </div>
      </section>
    </>
  )
}
