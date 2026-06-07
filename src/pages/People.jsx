import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import useScrollReveal from '../hooks/useScrollReveal'
import { DESK, CHAIRS } from '../data/people'

const YEARS = ['All', '2023', '2024', '2025', '2026']

function PersonCard({ imageSrc, name, role, years, onClick }) {
  return (
    <button className="pcard reveal" onClick={onClick}>
      <div className="photo-wrap">
        <div className="mat">
          <ImageSlot src={imageSrc} />
        </div>
        <span className="read" aria-hidden="true">Read reflection →</span>
      </div>
      <div>
        <div className="pn">{name}</div>
        <div className="pr">{role}</div>
      </div>
      <div className="py">{years.replace(/·.*/, '').trim()}</div>
    </button>
  )
}

function buildList(list, prefix, reflectionOffset = 0) {
  return list.map((p, i) => ({
    slotId: p.image || `ppl-${prefix}${i + 1}`,
    imageSrc: p.image ? `/images/${p.image}.jpg` : null,
    name: p.name || 'Name Surname',
    role: p.role,
    years: p.years,
    ord: prefix === 'd' ? 'The Desk' : 'The Chairs',
    quote: p.reflection || null,
  }))
}

export default function People() {
  const [selected, setSelected] = useState(null)
  const [filterYear, setFilterYear] = useState('All')
  const closeRef = useRef()
  const triggerRef = useRef()
  useScrollReveal(filterYear)

  const allDesk = buildList(DESK, 'd', 0)
  const allChairs = buildList(CHAIRS, 'c', 2)

  const deskList = filterYear === 'All' ? allDesk : allDesk.filter(p => p.years.includes(filterYear))
  const chairsList = filterYear === 'All' ? allChairs : allChairs.filter(p => p.years.includes(filterYear))

  const openModal = useCallback((person, cardEl) => {
    triggerRef.current = cardEl
    setSelected(person)
  }, [])

  const closeModal = useCallback(() => {
    setSelected(null)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!selected) return
    closeRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected, closeModal])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  useEffect(() => { document.title = 'People — CCMUN · 2022–2026' }, [])

  return (
    <>
      <section className="phead people">
        <div className="ghost-word">THE PEOPLE</div>
        <div className="wrap">
          <span className="eyebrow">The Desk &amp; The Chairs</span>
          <h1>The faces behind<br />every <em>gavel.</em></h1>
          <p className="lede">Across four years, dozens of students gave their evenings, their nerves, and their voices to CCMUN. Tap any face to read their reflection.</p>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: '1rem', padding: '5px 12px', borderRadius: 999,
            background: 'rgba(232,38,41,0.08)', border: '1px solid rgba(232,38,41,0.2)',
            fontSize: '0.75rem', letterSpacing: '0.02em', color: 'var(--red)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', opacity: 0.8, animation: 'pulse 2s ease-in-out infinite' }} />
            Reflections pouring in gradually!
          </span>
        </div>
      </section>

      {/* YEAR FILTER */}
      <div className="rail" role="group" aria-label="Filter by year">
        <div className="rail-inner">
          {YEARS.map(yr => (
            <button
              key={yr}
              className={filterYear === yr ? 'on' : ''}
              onClick={() => setFilterYear(yr)}
              aria-pressed={filterYear === yr}
            >
              {yr === 'All' ? 'All Years' : `CCMUN ${yr}`}
            </button>
          ))}
        </div>
      </div>

      {/* DESK */}
      {deskList.length > 0 && (
        <section className="pad-sm" style={{ paddingTop: 'clamp(20px,3vw,36px)' }}>
          <div className="wrap">
            <div className="grp-head reveal">
              <div>
                <span className="eyebrow">The Desk</span>
                <h2>Those who held the gavel.</h2>
              </div>
              <span className="cnt" aria-live="polite">{deskList.length} members</span>
            </div>
            <div className="people-grid">
              {deskList.map(p => (
                <PersonCard key={p.slotId} {...p} onClick={e => openModal(p, e.currentTarget)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {deskList.length > 0 && chairsList.length > 0 && <div className="divider" />}

      {/* CHAIRS */}
      {chairsList.length > 0 && (
        <section className="pad-sm">
          <div className="wrap">
            <div className="grp-head reveal">
              <div>
                <span className="eyebrow">The Chairs</span>
                <h2>Those who ran the rooms.</h2>
              </div>
              <span className="cnt" aria-live="polite">{chairsList.length} chairs</span>
            </div>
            <div className="people-grid">
              {chairsList.map(p => (
                <PersonCard key={p.slotId} {...p} onClick={e => openModal(p, e.currentTarget)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {deskList.length === 0 && chairsList.length === 0 && (
        <section className="pad">
          <div className="wrap" style={{ textAlign: 'center', color: 'var(--muted)' }}>
            No members found for this year.
          </div>
        </section>
      )}

      <section className="pad-sm">
        <div className="wrap" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4.4vw,3rem)', letterSpacing: '-.03em', maxWidth: '20ch' }}>
            None of it would exist without our teachers.
          </h2>
          <Link to="/thanks" className="btn">Read our note of thanks <span className="arr">→</span></Link>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="pmodal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} — ${selected.role}`}
          onClick={e => e.target === e.currentTarget && closeModal()}
        >
          <div className="sheet">
            <button className="x" ref={closeRef} aria-label="Close" onClick={closeModal}>&times;</button>
            <div className="m-photo">
              <div className="mat">
                <ImageSlot src={selected.imageSrc} />
              </div>
            </div>
            <div className="m-body">
              <span className="m-ord">{selected.ord}</span>
              <h3 className="m-name">{selected.name}</h3>
              <div className="m-role">{selected.role}</div>
              <div className="m-years">{selected.years}</div>
              <p className="m-quote">
                {selected.quote
                  ? <>{selected.quote}<em>— {selected.role}</em></>
                  : <span style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '0.9em' }}>Reflection still brewing…</span>
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
