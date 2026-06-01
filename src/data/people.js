export const REFLECTIONS = [
  "I walked in not knowing what a 'point of order' was, and walked out unable to stop raising them. CCMUN gave me a voice I didn't know I had.",
  "Some of my proudest moments happened at 1am, gluing placards and laughing until it hurt. We were exhausted, and we were exactly where we wanted to be.",
  "Chairing my first council terrified me. By the closing gavel, I realised the room had taught me more than I taught it.",
  "We started something out of nothing but stubborn belief. Handing it to the juniors is the hardest and proudest thing I've done.",
  "CCMUN was never really about winning debates. It was about learning to listen, to disagree well, and to lead anyway.",
  "Four years on, the friendships outlasted the resolutions. That, more than any award, is what I'm taking with me.",
]

// Secretariat team sourced from chungchengmun.wixstudio.com/ccmun/secretariatteam
export const DESK = [
  { name: 'Chua Chong Jie Clement', role: 'Secretary-General', years: '2022 — 2026 · Founder' },
  { name: 'Radiance Tan', role: 'Deputy Secretary-General (Academics)', years: '2026' },
  { name: 'Bek Joon Hao', role: 'Deputy Secretary-General (Conference Management)', years: '2026' },
  { name: 'Ryan Tan Jing Min', role: 'Under Secretary-General (Academics)', years: '2026' },
  { name: 'Boo Shao Yang', role: 'Under Secretary-General (Logistics)', years: '2026' },
  { name: 'Danelle Kaylee Khoo Bacomo', role: 'Under Secretary-General (Outreach)', years: '2026' },
  { name: 'Chuah Yew Seon', role: 'Chief of Staff', years: '2026' },
]

// Committees for CCMUN 2026
const COMMITTEES = [
  'UNHCR', 'FAO', 'IPCC', 'Press Corps',
]

const YEAR_CYCLE = ['2023', '2023 — 2024', '2024', '2024 — 2025', '2025', '2025 — 2026', '2026']
const yr = i => YEAR_CYCLE[i % YEAR_CYCLE.length]

// name field left blank — to be filled from Instagram scrape or manually
export const CHAIRS = COMMITTEES.flatMap((c, i) => [
  { name: '', role: `Chairperson · ${c}`, years: '2026' },
  { name: '', role: `Deputy Chair · ${c}`, years: '2026' },
])
