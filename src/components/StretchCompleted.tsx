import Lottie from 'lottie-react';
import Confetti from 'react-confetti';
import stretch4paws from '../data/animations.json';

export default function StretchCompleted() {
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
    </section>
  );
}
