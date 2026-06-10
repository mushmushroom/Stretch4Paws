import Lottie from 'lottie-react';
import { useStretchContext } from '../context/useStretchContext';
import stretch4paws from '../data/animations.json';
import { useEffect, useRef } from 'react';

export default function StretchInfo() {
  const { stretches, currentStretchIndex, phase, currentStretch } = useStretchContext();

  const stretch = stretches[currentStretchIndex];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const pausedFrameRef = useRef<number | null>(null);
  const lastSegmentRef = useRef<string | null>(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottieRef.current.animationItem;
    if (!anim) return;

    // RESET - hard reset animation
    if (phase === 'idle') {
      pausedFrameRef.current = null;
      lastSegmentRef.current = null;

      anim.stop();
      anim.goToAndStop(0, true);

      return;
    }

    // PAUSE — freeze frame
    if (phase === 'paused') {
      pausedFrameRef.current = anim.currentFrame;
      anim.pause();
      return;
    }

    // Determine which segment to play based on phase
    let segment: [number, number] | null = null;
    let loop = true;
    let key = '';
    if (phase === 'stretch') {
      segment = [stretch.startFrame, stretch.endFrame];
      loop = true;
      key = `stretch-${currentStretchIndex}`;
    }

    if (!segment) return;

    // RESUME from paused frame
    if (pausedFrameRef.current !== null) {
      anim.loop = loop;
      anim.goToAndPlay(pausedFrameRef.current - 1, true);
      pausedFrameRef.current = null;
      lastSegmentRef.current = key;
      return;
    }

    // Only play new segment if different from last
    if (lastSegmentRef.current !== key) {
      anim.loop = loop;
      anim.playSegments(segment, true);
      lastSegmentRef.current = key;
    }
  }, [phase, stretch, currentStretchIndex]);

  if (!currentStretch) return null;

  return (
    <section className="section stretch-info">
      <div className="stretch-info__img animation-img">
        <Lottie lottieRef={lottieRef} animationData={stretch4paws} autoplay={false} loop={false} />
      </div>

      <h2 className="stretch-info__name">{stretch.name}</h2>
      <p className="stretch-info__description">{stretch.description}</p>
    </section>
  );
}
