import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const RATIO_CACHE_KEY = 'gallery-ratios-v1';

const getCachedRatios = () => {
  try { return JSON.parse(localStorage.getItem(RATIO_CACHE_KEY) || '{}'); } catch { return {}; }
};

const saveRatios = (ratios) => {
  try { localStorage.setItem(RATIO_CACHE_KEY, JSON.stringify(ratios)); } catch {}
};

const loadImageRatios = async (urls, onPartial) => {
  const cached = getCachedRatios();
  const missing = urls.filter(u => cached[u] === undefined);

  if (missing.length === 0) return cached;

  onPartial(cached);

  const fresh = await Promise.all(
    missing.map(src => new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve([src, img.naturalHeight / img.naturalWidth]);
      img.onerror = () => resolve([src, 0.667]);
    }))
  );

  const result = { ...cached, ...Object.fromEntries(fresh) };
  saveRatios(result);
  return result;
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [ratios, setRatios] = useState({});

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };
    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    switch (direction) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return {
        x: containerRect.width / 2 - item.w / 2,
        y: containerRect.height / 2 - item.h / 2,
      };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    const urls = items.map(i => i.img);
    loadImageRatios(urls, setRatios).then(setRatios);
  }, [items]);

  const imagesReady = width > 0 && items.length > 0 && Object.keys(ratios).length > 0;

  const grid = useMemo(() => {
    if (!width || !imagesReady) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const columnWidth = (width - (columns - 1) * gap) / columns;
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = columnWidth * (ratios[child.img] ?? 0.667);
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width, imagesReady, ratios]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, { ...animProps, duration, ease, overwrite: 'auto' });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id, element) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.masonry-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id, element) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.masonry-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  const totalHeight = grid.reduce((max, item) => Math.max(max, item.y + item.h), 0);

  if (!imagesReady) {
    const skeletonHeights = [1.2, 0.8, 1.5, 0.9, 1.1, 0.7, 1.3, 1.0, 0.85, 1.4, 0.95, 1.2, 0.75, 1.1, 0.9, 1.3];
    return (
      <div
        ref={containerRef}
        className="masonry-skeleton"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {skeletonHeights.slice(0, columns * 4).map((ratio, i) => (
          <div
            key={i}
            className="masonry-skeleton-item"
            style={{ height: Math.round(200 * ratio), animationDelay: `${(i % 6) * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: totalHeight || 'auto', minHeight: 200 }}
    >
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          style={{
            position: 'absolute',
            boxSizing: 'content-box',
            willChange: 'transform, width, height, opacity',
            cursor: item.url ? 'pointer' : 'default',
          }}
          onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 10,
              boxShadow: '0px 10px 50px -10px rgba(0,0,0,0.25)',
            }}
          >
            {colorShiftOnHover && (
              <div
                className="masonry-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 10,
                  background: 'linear-gradient(to top right, rgba(232,38,41,0.5), rgba(120,80,200,0.5))',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
