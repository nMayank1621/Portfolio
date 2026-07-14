import { useRef } from 'react';
import './TiltCard.css';

/**
 * React Bits – TiltCard
 * 3-D perspective tilt effect following the mouse cursor.
 */
export default function TiltCard({ children, className = '', maxTilt = 10 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `
      perspective(900px)
      rotateY(${x * maxTilt * 2}deg)
      rotateX(${-y * maxTilt * 2}deg)
      scale3d(1.015, 1.015, 1.015)
    `;
  };

  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  return (
    <div
      ref={ref}
      className={`tilt-root ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
