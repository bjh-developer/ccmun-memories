import Masonry from '../components/Masonry';

// Replace these with real CCMUN photos.
// Each item: { id, img, url }
// url = optional link when clicked (use '' for no link)
const PHOTOS = [
  { id: '1',  img: '/assets/91cbb027-cdd4-4842-a539-6a98637f7720.JPG',  url: '' },
  { id: '2',  img: '/assets/DSC00139.JPG',  url: '' },
  { id: '3',  img: '/assets/DSC00973.JPG',  url: '' },
  { id: '4',  img: '/assets/DSC00987.JPG',  url: '' },
];

export default function Gallery() {
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
          items={PHOTOS}
          animateFrom="bottom"
          stagger={0.04}
          blurToFocus={true}
          scaleOnHover={true}
          hoverScale={0.97}
          colorShiftOnHover={false}
        />
      </div>
    </section>
  );
}
