import Lottie from 'lottie-react';
import { useStretchContext } from '../context/StretchContext';
import stretch4paws from '../data/animations.json';
import { useEffect, useRef } from 'react';

export default function StretchInfo() {
  const { stretches, currentStretchIndex, isActive } = useStretchContext();

  const stretch = stretches[currentStretchIndex];

  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (!lottieRef.current) return;

    if (!isActive) {
      lottieRef.current.playSegments([0, 72], true);
    } else {
      lottieRef.current.playSegments([stretch.startFrame, stretch.endFrame], true);
    }
  }, [isActive, stretch]);

  return (
    <section className="section stretch-info">
      <div className="stretch-info__img animation-img">
        <Lottie
          lottieRef={lottieRef}
          animationData={stretch4paws}
          loop={true} 
        />
      </div>
      <h2 className="stretch-info__name">{stretch.name}</h2>
      <p className="stretch-info__description">{stretch.description}</p>
    </section>
  );
}
