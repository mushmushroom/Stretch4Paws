import Lottie from 'lottie-react';
import { useRef } from 'react';

import stretch4paws from '../../data/animations.json';
import Logo from '../Logo';

export default function AuthInfo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);

  function handleDOMLoaded() {
    const anim = lottieRef.current?.animationItem;
    if (!anim) return;
    anim.loop = true;
    anim.playSegments([0, 72], true);
  }

  return (
    <div className="auth-container__section auth-container__info">
      <Logo text={false} />
      <div className="animation-img">
        <Lottie
          lottieRef={lottieRef}
          animationData={stretch4paws}
          autoplay={false}
          loop={false}
          onDOMLoaded={handleDOMLoaded}
        />
      </div>
      <div className="register__info-text">
        <h3 className="register__info-title">Tiny stretches, happy humans.</h3>
        <p className="register__info-descr">
          Build a desk-stretch habit your body (and your inner pup) will thank you for.
        </p>
      </div>
    </div>
  );
}
