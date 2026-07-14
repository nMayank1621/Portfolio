import { useRef } from 'react';
import './SpotlightCard.css';

/**
 * React Bits – SpotlightCard
 * Mouse-tracking radial spotlight glow behind the card.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255,0,255,0.14)',
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top } = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - left}px`);
    el.style.setProperty('--sy', `${e.clientY - top}px`);
    el.style.setProperty('--sc', spotlightColor);
  };

  return (
    <div ref={ref} className={`sc-root ${className}`} onMouseMove={onMove}>
      <div className="sc-glow" />
      {children}
    </div>
  );
}
