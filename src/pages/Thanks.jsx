import { useEffect } from 'react'
import ccmunLogo from '/assets/ccmun-logo.png'
import ImageSlot from '../components/ImageSlot'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Thanks() {
  useScrollReveal()
  useEffect(() => { document.title = 'Thanks — CCMUN · 2022–2026' }, [])

  return (
    <>
      <section className="phead thanks">
        <div className="ghost-word">THANK YOU</div>
        <div className="wrap">
          <span className="eyebrow">With gratitude</span>
          <h1>To those who let<br />us <em>try.</em></h1>
          <p className="lede">CCMUN was a student's idea, but it only became real because teachers and a school chose to believe in it. These pages are theirs as much as ours.</p>
        </div>
      </section>

      {/* JOON HAO'S LETTER */}
      <section className="letter-sec">
        <div className="wrap">
          <div className="letter reveal">
            <span className="l-from">From Bek Joon Hao (One of the Pioneers of CCMUN)</span>
            <p>To everyone who has been a part of CCMUN,</p>
            <p>Let me be upfront: this was a crazily ambitious idea. A group of Secondary 4 students, no dedicated MUN CCA, no guarantee of anyone continuing it after we left, all while preparing for our O Levels. If you had asked any reasonable person whether this would work, they would have politely, and very reasonably, said no.</p>
            <p>And here is the thing that still strikes me, even now. Unlike schools with established MUN CCAs built to outlast any single cohort, CCMUN has never had that luxury. Every year it existed was because a fresh group of students looked at the uncertainty, looked at the workload, looked at the complete absence of any guarantee, and said yes anyway. That is not a footnote. That is the whole story.</p>
            <p>To our teachers and the school, thank you. Thank you to our teacher-in-charge Ms Chan Ann Chin Valerie, to the Humanities Department, to our Principal Mr Terence Yao, for trusting a student's idea with classrooms, time, and patience. You did not have to say yes. You did. That matters more than I can put into words.</p>
            <p>To the Desks and the Chairs across every run of CCMUN, you started raw, most of you. Ms Chan will be the first to tell you that. But you stayed, you learned, and you became the backbone of everything. I believe watching yourself grow from nervous volunteers into confident leaders was one of the best things you have ever seen.</p>
            <p>Four years. Delegates learning diplomatic language they had never used before. Professor Kishore Mahbubani gracing our conference. Ms Valerie Chan writing a report card that made me, unashamedly, tear up a little. None of that was supposed to happen from a passion project born in a Secondary 4 classroom.</p>
            <p>To the juniors reading this: though CCMUN has come to an end, the spirit behind it does not have to. The audacity to be the first, to try the thing that has no roadmap, to bet on passion when there are no guarantees — that does not need CCMUN to survive. Your school needs people who are willing to start something, not just join something. Be that person. Your wild, reckless, crazily ambitious idea might just become someone else's four-year legacy.</p>
            <p>Thank you for four years of CCMUN legacy.</p>
            <div className="sign">
              With pride & gratitude,<b>Bek Joon Hao, Pioneer, CCMUN</b>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* APPRECIATION NOTE */}
      <section className="pad note-sec">
        <div className="wrap reveal">
          <p className="appr">
            Thank you for the scoldings and the patience, the late evenings and the second chances.
            For trusting a group of students with{' '}
            <em>a room, a gavel, and a dream</em>{' '}
            — and for standing beside us through all four years of it.
          </p>
        </div>
      </section>

      {/* HONOUREES */}
      <section className="pad-sm" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grp-head reveal" style={{ textAlign: 'center', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{ textAlign: 'center' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>With special thanks to</span>
            </div>
          </div>
          <div className="hon-grid">
            <div className="hon reveal">
              <div>
                <div className="h-name">Mr Terence Yao Zhixuan</div>
                <div className="h-role">Principal, Chung Cheng High School (Main)</div>
                <div className="h-tag">School Leader</div>
              </div>
            </div>
            <div className="hon reveal d1">
              <div>
                <div className="h-name">Ms Chan Ann Chin Valerie</div>
                <div className="h-role">HOD / Humanities</div>
                <div className="h-tag">Head of Department</div>
              </div>
            </div>
          </div>
          <div className="dept-card reveal d2">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>And to</span>
            <h3>The Humanities Department &amp; Chung Cheng High School (Main)</h3>
            <p>For the classrooms after hours, the encouragement when we doubted ourselves, and a home that let a student idea grow into a four-year legacy.</p>
          </div>
        </div>
      </section>

      {/* FINALE */}
      <section className="finale">
        <div className="glow" />
        <div className="wrap">
          <img className="ph-img" src={ccmunLogo} alt="CCMUN phoenix" />
          <div className="ty">Thank <em>you.</em></div>
          <div className="arc-row">
            <span>2022</span><span className="ln" /><span>2026</span>
          </div>
          <p className="closing">Four years. One reckless idea. A legacy that rose — and will rise again in everyone it touched.</p>
          <span className="tag">Delegates of Today, Leaders of Tomorrow</span>
        </div>
      </section>
    </>
  )
}
