import Lottie from 'lottie-react';
import stretch4paws from '../../data/animations.json';

export default function MascotAnimation() {
  return (
    <div className="animation-img">
      <Lottie animationData={stretch4paws} autoplay loop initialSegment={[0, 72]} />
    </div>
  );
}
