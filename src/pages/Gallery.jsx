import { useState } from 'react';
import Masonry from '../components/Masonry';

const PAGE_SIZE = 24;

// Replace these with real CCMUN photos.
// Each item: { id, img, url }
// url = optional link when clicked (use '' for no link)
const PHOTOS = [
  { id: '1',   img: '/assets/91cbb027-cdd4-4842-a539-6a98637f7720.JPG',  url: '' },
  { id: '2',   img: '/assets/DSC00139.JPG',  url: '' },
  { id: '3',   img: '/assets/DSC00973.JPG',  url: '' },
  { id: '4',   img: '/assets/DSC00987.JPG',  url: '' },
  { id: '5',   img: '/assets/DSC00014.jpg',  url: '' },
  { id: '6',   img: '/assets/DSC00044.jpg',  url: '' },
  { id: '7',   img: '/assets/DSC00058.jpg',  url: '' },
  { id: '8',   img: '/assets/DSC00066.jpg',  url: '' },
  { id: '9',   img: '/assets/DSC00068.jpg',  url: '' },
  { id: '10',  img: '/assets/DSC00071.jpg',  url: '' },
  { id: '11',  img: '/assets/DSC00072.jpg',  url: '' },
  { id: '12',  img: '/assets/DSC00074.jpg',  url: '' },
  { id: '13',  img: '/assets/DSC00088.jpg',  url: '' },
  { id: '14',  img: '/assets/DSC00092.jpg',  url: '' },
  { id: '15',  img: '/assets/DSC00096.jpg',  url: '' },
  { id: '16',  img: '/assets/DSC00100.jpg',  url: '' },
  { id: '17',  img: '/assets/DSC00108.jpg',  url: '' },
  { id: '18',  img: '/assets/DSC00109.jpg',  url: '' },
  { id: '19',  img: '/assets/DSC00111.jpg',  url: '' },
  { id: '20',  img: '/assets/DSC00112.jpg',  url: '' },
  { id: '21',  img: '/assets/DSC00114.jpg',  url: '' },
  { id: '22',  img: '/assets/DSC00121.jpg',  url: '' },
  { id: '23',  img: '/assets/DSC00122.jpg',  url: '' },
  { id: '24',  img: '/assets/DSC00126.jpg',  url: '' },
  { id: '25',  img: '/assets/DSC00143.jpg',  url: '' },
  { id: '26',  img: '/assets/DSC00150.jpg',  url: '' },
  { id: '27',  img: '/assets/DSC00159.jpg',  url: '' },
  { id: '28',  img: '/assets/DSC00163.jpg',  url: '' },
  { id: '29',  img: '/assets/DSC00170.jpg',  url: '' },
  { id: '30',  img: '/assets/DSC00176.jpg',  url: '' },
  { id: '31',  img: '/assets/DSC00180.jpg',  url: '' },
  { id: '32',  img: '/assets/DSC00183.jpg',  url: '' },
  { id: '33',  img: '/assets/DSC00195.jpg',  url: '' },
  { id: '34',  img: '/assets/DSC00197.jpg',  url: '' },
  { id: '35',  img: '/assets/DSC00231.jpg',  url: '' },
  { id: '36',  img: '/assets/DSC00255.jpg',  url: '' },
  { id: '37',  img: '/assets/DSC00287.jpg',  url: '' },
  { id: '38',  img: '/assets/DSC00294.jpg',  url: '' },
  { id: '39',  img: '/assets/DSC00306.jpg',  url: '' },
  { id: '40',  img: '/assets/DSC00328.jpg',  url: '' },
  { id: '41',  img: '/assets/DSC00347.jpg',  url: '' },
  { id: '42',  img: '/assets/DSC00352.jpg',  url: '' },
  { id: '43',  img: '/assets/DSC00395.jpg',  url: '' },
  { id: '44',  img: '/assets/DSC00410.jpg',  url: '' },
  { id: '45',  img: '/assets/DSC00423.jpg',  url: '' },
  { id: '46',  img: '/assets/DSC00436.jpg',  url: '' },
  { id: '47',  img: '/assets/DSC00455.jpg',  url: '' },
  { id: '48',  img: '/assets/DSC00461.jpg',  url: '' },
  { id: '49',  img: '/assets/DSC00488.jpg',  url: '' },
  { id: '50',  img: '/assets/DSC00505.jpg',  url: '' },
  { id: '51',  img: '/assets/DSC00532.jpg',  url: '' },
  { id: '52',  img: '/assets/DSC00539.jpg',  url: '' },
  { id: '53',  img: '/assets/DSC00563.jpg',  url: '' },
  { id: '54',  img: '/assets/DSC00569.jpg',  url: '' },
  { id: '55',  img: '/assets/DSC00587.jpg',  url: '' },
  { id: '56',  img: '/assets/DSC00604.jpg',  url: '' },
  { id: '57',  img: '/assets/DSC00610.jpg',  url: '' },
  { id: '58',  img: '/assets/DSC00630.jpg',  url: '' },
  { id: '59',  img: '/assets/DSC00663.jpg',  url: '' },
  { id: '60',  img: '/assets/DSC00685.jpg',  url: '' },
  { id: '61',  img: '/assets/DSC00692.jpg',  url: '' },
  { id: '62',  img: '/assets/DSC00701.jpg',  url: '' },
  { id: '63',  img: '/assets/DSC00706.jpg',  url: '' },
  { id: '64',  img: '/assets/DSC00732.jpg',  url: '' },
  { id: '65',  img: '/assets/DSC00739.jpg',  url: '' },
  { id: '66',  img: '/assets/DSC00742.jpg',  url: '' },
  { id: '67',  img: '/assets/DSC00744.jpg',  url: '' },
  { id: '68',  img: '/assets/DSC00757.jpg',  url: '' },
  { id: '69',  img: '/assets/DSC00760.jpg',  url: '' },
  { id: '70',  img: '/assets/DSC00764.jpg',  url: '' },
  { id: '71',  img: '/assets/DSC00781.jpg',  url: '' },
  { id: '72',  img: '/assets/DSC00792.jpg',  url: '' },
  { id: '73',  img: '/assets/DSC00796.jpg',  url: '' },
  { id: '74',  img: '/assets/DSC00800.jpg',  url: '' },
  { id: '75',  img: '/assets/DSC00802.jpg',  url: '' },
  { id: '76',  img: '/assets/DSC00804.jpg',  url: '' },
  { id: '77',  img: '/assets/DSC00806.jpg',  url: '' },
  { id: '78',  img: '/assets/DSC00808.jpg',  url: '' },
  { id: '79',  img: '/assets/DSC00810.jpg',  url: '' },
  { id: '80',  img: '/assets/DSC00811.jpg',  url: '' },
  { id: '81',  img: '/assets/DSC00813.jpg',  url: '' },
  { id: '82',  img: '/assets/DSC00816.jpg',  url: '' },
  { id: '83',  img: '/assets/DSC00817.jpg',  url: '' },
  { id: '84',  img: '/assets/DSC00820.jpg',  url: '' },
  { id: '85',  img: '/assets/DSC00827.jpg',  url: '' },
  { id: '86',  img: '/assets/DSC00839.jpg',  url: '' },
  { id: '87',  img: '/assets/DSC00840.jpg',  url: '' },
  { id: '88',  img: '/assets/DSC00851.jpg',  url: '' },
  { id: '89',  img: '/assets/DSC00864.jpg',  url: '' },
  { id: '90',  img: '/assets/DSC00871.jpg',  url: '' },
  { id: '91',  img: '/assets/DSC00875.jpg',  url: '' },
  { id: '92',  img: '/assets/DSC00877.jpg',  url: '' },
  { id: '93',  img: '/assets/DSC00879.jpg',  url: '' },
  { id: '94',  img: '/assets/DSC00880.jpg',  url: '' },
  { id: '95',  img: '/assets/DSC00883.jpg',  url: '' },
  { id: '96',  img: '/assets/DSC00885.jpg',  url: '' },
  { id: '97',  img: '/assets/DSC00889.jpg',  url: '' },
  { id: '98',  img: '/assets/DSC00890.jpg',  url: '' },
  { id: '99',  img: '/assets/DSC00892.jpg',  url: '' },
  { id: '100', img: '/assets/DSC00894.jpg',  url: '' },
  { id: '101', img: '/assets/DSC00902.jpg',  url: '' },
  { id: '102', img: '/assets/DSC00905.jpg',  url: '' },
  { id: '103', img: '/assets/DSC00908.jpg',  url: '' },
  { id: '104', img: '/assets/DSC00928.jpg',  url: '' },
  { id: '105', img: '/assets/DSC00935.jpg',  url: '' },
  { id: '106', img: '/assets/DSC00937.jpg',  url: '' },
  { id: '107', img: '/assets/DSC00939.jpg',  url: '' },
  { id: '108', img: '/assets/DSC00942.jpg',  url: '' },
  { id: '109', img: '/assets/DSC00944.jpg',  url: '' },
  { id: '110', img: '/assets/DSC00946.jpg',  url: '' },
  { id: '111', img: '/assets/DSC00947.jpg',  url: '' },
  { id: '112', img: '/assets/DSC00949.jpg',  url: '' },
  { id: '113', img: '/assets/DSC00952.jpg',  url: '' },
  { id: '114', img: '/assets/DSC00953.jpg',  url: '' },
  { id: '115', img: '/assets/DSC00969.jpg',  url: '' },
  { id: '116', img: '/assets/DSC00981.jpg',  url: '' },
  { id: '117', img: '/assets/DSC00982.jpg',  url: '' },
  { id: '118', img: '/assets/7AABA0D3-B486-4575-8BB4-D93DFACD8F01.jpg',  url: '' },
  { id: '119', img: '/assets/CCMUN GROUP PHOTO-2.jpg',  url: '' },
  { id: '120', img: '/assets/CCMUN GROUP PHOTO-4.jpg',  url: '' },
  { id: '121', img: '/assets/IMG_0645(1).JPG',  url: '' },
  { id: '122', img: '/assets/IMG_0645.JPG',  url: '' },
  { id: '123', img: '/assets/IMG_1136.PNG',  url: '' },
  { id: '124', img: '/assets/IMG_1137.PNG',  url: '' },
  { id: '125', img: '/assets/DSC03344.jpeg',  url: '' },
  { id: '126', img: '/assets/IMG_1151.JPG',  url: '' },
  { id: '127', img: '/assets/IMG_1152.JPG',  url: '' },
  { id: '128', img: '/assets/IMG_1166.jpg',  url: '' },
  { id: '129', img: '/assets/IMG_1182.jpg',  url: '' },
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
