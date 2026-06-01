import Masonry from '../components/Masonry';

// Replace these with real CCMUN photos.
// Each item: { id, img, url }
// url = optional link when clicked (use '' for no link)
const PHOTOS = [
  { id: '1',  img: 'https://picsum.photos/id/1015/600/900',  url: '' },
  { id: '2',  img: 'https://picsum.photos/id/1011/600/750',  url: '' },
  { id: '3',  img: 'https://picsum.photos/id/1020/600/800',  url: '' },
  { id: '4',  img: 'https://picsum.photos/id/1035/600/600',  url: '' },
  { id: '5',  img: 'https://picsum.photos/id/1043/600/850',  url: '' },
  { id: '6',  img: 'https://picsum.photos/id/1044/600/700',  url: '' },
  { id: '7',  img: 'https://picsum.photos/id/1053/600/650',  url: '' },
  { id: '8',  img: 'https://picsum.photos/id/106/600/900',   url: '' },
  { id: '9',  img: 'https://picsum.photos/id/1062/600/750',  url: '' },
  { id: '10', img: 'https://picsum.photos/id/1063/600/800',  url: '' },
  { id: '11', img: 'https://picsum.photos/id/1074/600/600',  url: '' },
  { id: '12', img: 'https://picsum.photos/id/1080/600/850',  url: '' },
  { id: '13', img: 'https://picsum.photos/id/110/600/700',   url: '' },
  { id: '14', img: 'https://picsum.photos/id/1084/600/650',  url: '' },
  { id: '15', img: 'https://picsum.photos/id/1086/600/900',  url: '' },
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
