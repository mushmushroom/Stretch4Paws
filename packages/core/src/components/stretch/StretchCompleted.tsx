import Lottie from 'lottie-react';
import Confetti from 'react-confetti';

import stretch4paws from '../../data/animations.json';
import { useStretchContext } from '../../context/stretchContext/useStretchContext';
import ErrorMessage from '../common/ErrorMessage';

export default function StretchCompleted() {
  const { sessionSaveError } = useStretchContext();

  return (
    <section className="section stretch-completed">
      <Confetti recycle={false} numberOfPieces={900} gravity={0.2} />
      <div className="stretch-completed__img animation-img">
        <Lottie animationData={stretch4paws} initialSegment={[1608, 1632]} loop={true} />
      </div>
      <h2 className="stretch-completed__title">Congratulations!</h2>
      <p className="stretch-completed__text">
        You’ve completed your stretch routine! Take a deep breath, hydrate, and return refreshed.
      </p>
      {sessionSaveError && (
        <ErrorMessage message="Your session could not be saved. Check your connection and try again." />
      )}
    </section>
  );
}
