import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ccmunLogo from '/assets/ccmun-logo.png'

const LINKS = [
  ['/', 'Home'],
  ['/history', 'History'],
  ['/people', 'People'],
  ['/thanks', 'Thanks'],
  ['/gallery', 'Gallery'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <NavLink className="brand" to="/" onClick={close}>
            <img src={ccmunLogo} alt="CCMUN phoenix logo" />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.12 }}>
              <b>Chung Cheng Model United Nations</b>
              <span className="b-sub">A Memory · 2022–2026</span>
            </span>
          </NavLink>

          <button
            className={`nav-toggle${open ? ' on' : ''}`}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav id="main-nav" className={`nav-links${open ? ' open' : ''}`}>
        {LINKS.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={close}
            className={({ isActive }) => isActive ? 'active' : undefined}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
