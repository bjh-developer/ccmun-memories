import { useState } from 'react';
import Masonry from '../components/Masonry';

const PAGE_SIZE = 24;

// Replace these with real CCMUN photos.
// Each item: { id, img, url }
// url = optional link when clicked (use '' for no link)
const PHOTOS = [
  { id: '1',   img: '/assets/91cbb027-cdd4-4842-a539-6a98637f7720.webp',  url: '' },
  { id: '2',   img: '/assets/DSC00139.webp',  url: '' },
  { id: '3',   img: '/assets/DSC00973.webp',  url: '' },
  { id: '4',   img: '/assets/DSC00987.webp',  url: '' },
  { id: '5',   img: '/assets/DSC00014.webp',  url: '' },
  { id: '6',   img: '/assets/DSC00044.webp',  url: '' },
  { id: '7',   img: '/assets/DSC00058.webp',  url: '' },
  { id: '8',   img: '/assets/DSC00066.webp',  url: '' },
  { id: '9',   img: '/assets/DSC00068.webp',  url: '' },
  { id: '10',  img: '/assets/DSC00071.webp',  url: '' },
  { id: '11',  img: '/assets/DSC00072.webp',  url: '' },
  { id: '12',  img: '/assets/DSC00074.webp',  url: '' },
  { id: '13',  img: '/assets/DSC00088.webp',  url: '' },
  { id: '14',  img: '/assets/DSC00092.webp',  url: '' },
  { id: '15',  img: '/assets/DSC00096.webp',  url: '' },
  { id: '16',  img: '/assets/DSC00100.webp',  url: '' },
  { id: '17',  img: '/assets/DSC00108.webp',  url: '' },
  { id: '18',  img: '/assets/DSC00109.webp',  url: '' },
  { id: '19',  img: '/assets/DSC00111.webp',  url: '' },
  { id: '20',  img: '/assets/DSC00112.webp',  url: '' },
  { id: '21',  img: '/assets/DSC00114.webp',  url: '' },
  { id: '22',  img: '/assets/DSC00121.webp',  url: '' },
  { id: '23',  img: '/assets/DSC00122.webp',  url: '' },
  { id: '24',  img: '/assets/DSC00126.webp',  url: '' },
  { id: '25',  img: '/assets/DSC00143.webp',  url: '' },
  { id: '26',  img: '/assets/DSC00150.webp',  url: '' },
  { id: '27',  img: '/assets/DSC00159.webp',  url: '' },
  { id: '28',  img: '/assets/DSC00163.webp',  url: '' },
  { id: '29',  img: '/assets/DSC00170.webp',  url: '' },
  { id: '30',  img: '/assets/DSC00176.webp',  url: '' },
  { id: '31',  img: '/assets/DSC00180.webp',  url: '' },
  { id: '32',  img: '/assets/DSC00183.webp',  url: '' },
  { id: '33',  img: '/assets/DSC00195.webp',  url: '' },
  { id: '34',  img: '/assets/DSC00197.webp',  url: '' },
  { id: '35',  img: '/assets/DSC00231.webp',  url: '' },
  { id: '36',  img: '/assets/DSC00255.webp',  url: '' },
  { id: '37',  img: '/assets/DSC00287.webp',  url: '' },
  { id: '38',  img: '/assets/DSC00294.webp',  url: '' },
  { id: '39',  img: '/assets/DSC00306.webp',  url: '' },
  { id: '40',  img: '/assets/DSC00328.webp',  url: '' },
  { id: '41',  img: '/assets/DSC00347.webp',  url: '' },
  { id: '42',  img: '/assets/DSC00352.webp',  url: '' },
  { id: '43',  img: '/assets/DSC00395.webp',  url: '' },
  { id: '44',  img: '/assets/DSC00410.webp',  url: '' },
  { id: '45',  img: '/assets/DSC00423.webp',  url: '' },
  { id: '46',  img: '/assets/DSC00436.webp',  url: '' },
  { id: '47',  img: '/assets/DSC00455.webp',  url: '' },
  { id: '48',  img: '/assets/DSC00461.webp',  url: '' },
  { id: '49',  img: '/assets/DSC00488.webp',  url: '' },
  { id: '50',  img: '/assets/DSC00505.webp',  url: '' },
  { id: '51',  img: '/assets/DSC00532.webp',  url: '' },
  { id: '52',  img: '/assets/DSC00539.webp',  url: '' },
  { id: '53',  img: '/assets/DSC00563.webp',  url: '' },
  { id: '54',  img: '/assets/DSC00569.webp',  url: '' },
  { id: '55',  img: '/assets/DSC00587.webp',  url: '' },
  { id: '56',  img: '/assets/DSC00604.webp',  url: '' },
  { id: '57',  img: '/assets/DSC00610.webp',  url: '' },
  { id: '58',  img: '/assets/DSC00630.webp',  url: '' },
  { id: '59',  img: '/assets/DSC00663.webp',  url: '' },
  { id: '60',  img: '/assets/DSC00685.webp',  url: '' },
  { id: '61',  img: '/assets/DSC00692.webp',  url: '' },
  { id: '62',  img: '/assets/DSC00701.webp',  url: '' },
  { id: '63',  img: '/assets/DSC00706.webp',  url: '' },
  { id: '64',  img: '/assets/DSC00732.webp',  url: '' },
  { id: '65',  img: '/assets/DSC00739.webp',  url: '' },
  { id: '66',  img: '/assets/DSC00742.webp',  url: '' },
  { id: '67',  img: '/assets/DSC00744.webp',  url: '' },
  { id: '68',  img: '/assets/DSC00757.webp',  url: '' },
  { id: '69',  img: '/assets/DSC00760.webp',  url: '' },
  { id: '70',  img: '/assets/DSC00764.webp',  url: '' },
  { id: '71',  img: '/assets/DSC00781.webp',  url: '' },
  { id: '72',  img: '/assets/DSC00792.webp',  url: '' },
  { id: '73',  img: '/assets/DSC00796.webp',  url: '' },
  { id: '74',  img: '/assets/DSC00800.webp',  url: '' },
  { id: '75',  img: '/assets/DSC00802.webp',  url: '' },
  { id: '76',  img: '/assets/DSC00804.webp',  url: '' },
  { id: '77',  img: '/assets/DSC00806.webp',  url: '' },
  { id: '78',  img: '/assets/DSC00808.webp',  url: '' },
  { id: '79',  img: '/assets/DSC00810.webp',  url: '' },
  { id: '80',  img: '/assets/DSC00811.webp',  url: '' },
  { id: '81',  img: '/assets/DSC00813.webp',  url: '' },
  { id: '82',  img: '/assets/DSC00816.webp',  url: '' },
  { id: '83',  img: '/assets/DSC00817.webp',  url: '' },
  { id: '84',  img: '/assets/DSC00820.webp',  url: '' },
  { id: '85',  img: '/assets/DSC00827.webp',  url: '' },
  { id: '86',  img: '/assets/DSC00839.webp',  url: '' },
  { id: '87',  img: '/assets/DSC00840.webp',  url: '' },
  { id: '88',  img: '/assets/DSC00851.webp',  url: '' },
  { id: '89',  img: '/assets/DSC00864.webp',  url: '' },
  { id: '90',  img: '/assets/DSC00871.webp',  url: '' },
  { id: '91',  img: '/assets/DSC00875.webp',  url: '' },
  { id: '92',  img: '/assets/DSC00877.webp',  url: '' },
  { id: '93',  img: '/assets/DSC00879.webp',  url: '' },
  { id: '94',  img: '/assets/DSC00880.webp',  url: '' },
  { id: '95',  img: '/assets/DSC00883.webp',  url: '' },
  { id: '96',  img: '/assets/DSC00885.webp',  url: '' },
  { id: '97',  img: '/assets/DSC00889.webp',  url: '' },
  { id: '98',  img: '/assets/DSC00890.webp',  url: '' },
  { id: '99',  img: '/assets/DSC00892.webp',  url: '' },
  { id: '100', img: '/assets/DSC00894.webp',  url: '' },
  { id: '101', img: '/assets/DSC00902.webp',  url: '' },
  { id: '102', img: '/assets/DSC00905.webp',  url: '' },
  { id: '103', img: '/assets/DSC00908.webp',  url: '' },
  { id: '104', img: '/assets/DSC00928.webp',  url: '' },
  { id: '105', img: '/assets/DSC00935.webp',  url: '' },
  { id: '106', img: '/assets/DSC00937.webp',  url: '' },
  { id: '107', img: '/assets/DSC00939.webp',  url: '' },
  { id: '108', img: '/assets/DSC00942.webp',  url: '' },
  { id: '109', img: '/assets/DSC00944.webp',  url: '' },
  { id: '110', img: '/assets/DSC00946.webp',  url: '' },
  { id: '111', img: '/assets/DSC00947.webp',  url: '' },
  { id: '112', img: '/assets/DSC00949.webp',  url: '' },
  { id: '113', img: '/assets/DSC00952.webp',  url: '' },
  { id: '114', img: '/assets/DSC00953.webp',  url: '' },
  { id: '115', img: '/assets/DSC00969.webp',  url: '' },
  { id: '116', img: '/assets/DSC00981.webp',  url: '' },
  { id: '117', img: '/assets/DSC00982.webp',  url: '' },
  { id: '118', img: '/assets/7AABA0D3-B486-4575-8BB4-D93DFACD8F01.webp',  url: '' },
  { id: '119', img: '/assets/CCMUN GROUP PHOTO-2.webp',  url: '' },
  { id: '120', img: '/assets/CCMUN GROUP PHOTO-4.webp',  url: '' },
  { id: '121', img: '/assets/IMG_0645(1).webp',  url: '' },
  { id: '122', img: '/assets/IMG_0645.webp',  url: '' },
  { id: '123', img: '/assets/IMG_1136.webp',  url: '' },
  { id: '124', img: '/assets/IMG_1137.webp',  url: '' },
  { id: '125', img: '/assets/DSC03344.webp',  url: '' },
  { id: '126', img: '/assets/IMG_1151.webp',  url: '' },
  { id: '127', img: '/assets/IMG_1152.webp',  url: '' },
  { id: '128', img: '/assets/IMG_1166.webp',  url: '' },
  { id: '129', img: '/assets/IMG_1182.webp',  url: '' },
];

export default function Gallery() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = PHOTOS.slice(0, visible);
  const hasMore = visible < PHOTOS.length;

  return (
    <section style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
      <h1 style={{ fontFamily: 'var(--sans)', color: 'var(--ink)', marginBottom: '0.25rem' }}>
        Gallery
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
        CCMUN · 2022–2026
      </p>
      <div style={{ height: 'auto' }}>
        <Masonry
          items={shown}
          animateFrom="bottom"
          stagger={0.04}
          blurToFocus={true}
          scaleOnHover={true}
          hoverScale={0.97}
          colorShiftOnHover={false}
        />
      </div>
      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={() => setVisible(v => Math.min(v + PAGE_SIZE, PHOTOS.length))}
            style={{
              padding: '0.6rem 2rem',
              fontFamily: 'var(--sans)',
              fontSize: '0.9rem',
              background: 'transparent',
              color: 'var(--ink)',
              border: '1.5px solid var(--ink)',
              borderRadius: '6px',
              cursor: 'pointer',
              letterSpacing: '0.03em',
            }}
          >
            Load more ({PHOTOS.length - visible} remaining)
          </button>
        </div>
      )}
    </section>
  );
}
