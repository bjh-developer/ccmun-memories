import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import useScrollReveal from '../hooks/useScrollReveal'

const MILESTONES = [
  {
    id: 'm-2022', year: '2022', ord: 'The Beginning', title: 'One wild, reckless idea.',
    body: 'Before there was a conference, there were friends who refused to wait for permission. CCMUN began as a daydream — then a full year of planning, pitching, and quiet stubbornness to turn it into something real.',
    goh: null, slotId: 'hist-2022', placeholder: 'Founders / first meeting', final: false,
  },
  {
    id: 'm-2023', year: '2023', ord: 'First Conference · CCMUN I', title: 'The first gavel falls.',
    body: 'The sign-ups exceeded every expectation — so many that we ran out of merchandise. The Desk and Chairs were raw, but humble enough to learn the ropes. The debates were, against all odds, genuinely great.',
    goh: { name: 'Ms Olivia Tan Jia Yi', sub: 'Senior Geopolitical Risk Consultant, Expeditors International · Alumnus', image: 'goh-2023' }, slotId: 'hist-2023', placeholder: 'CCMUN I, 2023', final: false,
  },
  {
    id: 'm-2024', year: '2024', ord: 'Second Conference · CCMUN II', title: 'The legacy continues.',
    body: 'A new Desk inherited the gavel and carried it forward — proof that the idea could outlive its founders. Diplomacy, critical thinking, and far too little sleep, all over again.',
    goh: { name: 'Ms Ann Neo Zixin', sub: 'Journalist, The Straits Times', image: 'goh-2024' }, slotId: 'hist-2024', placeholder: 'CCMUN II, 2024', final: false,
  },
  {
    id: 'm-2025', year: '2025', ord: 'Third Conference · CCMUN III', title: 'Bigger rooms, bolder debates.',
    body: 'By the third year, CCMUN had become an institution in its own right — welcoming one of the most distinguished voices in Singaporean diplomacy to open the floor.',
    goh: { name: 'Prof Kishore Mahbubani', sub: 'Distinguished Fellow, Asia Research Institute, NUS', image: 'goh-2025' }, slotId: 'hist-2025', placeholder: 'CCMUN III, 2025', final: false,
  },
  {
    id: 'm-2026', year: '2026', ord: 'Fourth Conference · CCMUN IV', title: 'The final gavel.',
    body: 'Four years on, the room is full of delegates who speak a language they didn\'t know existed before they arrived. This is where the story closes — not with an ending, but with everything we passed on.',
    goh: { name: 'Ms Liew Wei Lin', sub: 'Assistant Director, Ministry of Foreign Affairs, Singapore', image: 'goh-2026' }, slotId: 'hist-2026', placeholder: 'CCMUN IV, 2026', final: true,
  },
]

const YEARS = MILESTONES.map(m => m.year)

export default function History() {
  const [activeYear, setActiveYear] = useState('2022')
  const milestoneRefs = useRef({})
  useScrollReveal()
  useEffect(() => { document.title = 'History — CCMUN · 2022–2026' }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setActiveYear(e.target.dataset.year)
      }),
      { rootMargin: '-45% 0px -45% 0px' }
    )
    Object.values(milestoneRefs.current).forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const scrollTo = year => {
    const el = milestoneRefs.current[year]
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset - 120
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <>
      <section className="phead">
        <div className="ghost-word">HISTORY</div>
        <div className="wrap">
          <span className="eyebrow">2022 — 2026</span>
          <h1>How a reckless idea<br />became a <em>legacy.</em></h1>
          <p className="lede">It started with a handful of friends and a question: what can we do for CCHM one last time before graduating? Four years later, this is the story of every gavel that followed.</p>
        </div>
      </section>

      <div className="rail">
        <div className="rail-inner">
          {YEARS.map(yr => (
            <button key={yr} className={activeYear === yr ? 'on' : ''} onClick={() => scrollTo(yr)}>
              {yr}
            </button>
          ))}
        </div>
      </div>

      <section className="tl">
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="spine" />
          {MILESTONES.map((m, i) => (
            <div
              key={m.id}
              id={m.id}
              className={`milestone${m.final ? ' final' : ''}`}
              data-year={m.year}
              ref={el => milestoneRefs.current[m.year] = el}
            >
              <span className="bigyr">{m.year}</span>
              <div className="node" />
              <div className="m-text reveal">
                <div className="m-card">
                  <div className="inner">
                    <span className="m-ord">{m.ord}</span>
                    <div className="m-yeartag">{m.year}</div>
                    <h3>{m.title}</h3>
                    <p>{m.body}</p>
                    {m.goh && (
                      <div className="m-goh">
                        <ImageSlot src={m.goh.image ? `/images/${m.goh.image}.jpg` : null} shape="circle" style={{ width: 40, height: 40, flexShrink: 0 }} />
                        <span>
                          <span className="gl">Guest of Honour</span>
                          <span className="gn">{m.goh.name}<small>{m.goh.sub}</small></span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {m.slotId && (
                <div className="m-media reveal d2">
                  <div className="mat">
                    <ImageSlot id={m.slotId} />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="final-banner reveal">
            <span className="pill"><span className="dot" />Four conferences · One unbroken legacy</span>
          </div>
        </div>
      </section>

      <section className="pad-sm">
        <div className="wrap" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4.4vw,3rem)', letterSpacing: '-.03em', maxWidth: '18ch' }}>
            The people who carried it are next.
          </h2>
          <Link to="/people" className="btn">Meet the Desk &amp; Chairs <span className="arr">→</span></Link>
        </div>
      </section>
    </>
  )
}
