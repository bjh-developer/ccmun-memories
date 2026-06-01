import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react';
import ccmunLogo from '/assets/ccmun-logo.png'
import cchmLogo from '/assets/CHSS-favicon.png'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="arc">
            Delegates of Today,<br /><em>Leaders of Tomorrow.</em>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img className="phoenix-sm" src={ccmunLogo} alt="" />
            <img className="phoenix-sm" src={cchmLogo} alt="" />
          </div>
        </div>
        <div className="foot-bottom">
          <span>Chung Cheng High School (Main) · Model United Nations · 2022 — 2026</span>
          <div className="foot-links">
            <a href="https://www.instagram.com/chungchengmun/" target="_blank" rel="noopener">Instagram <ArrowUpRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></a>
            <Link to="/history">History</Link>
            <Link to="/people">People</Link>
            <Link to="/thanks">Thanks</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
