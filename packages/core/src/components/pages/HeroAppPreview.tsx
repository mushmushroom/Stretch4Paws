import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import MascotAnimation from '../common/MascotAnimation';

export default function HeroAppPreview() {
  return (
    <div className="hero-preview">
      <div className="hero-preview__stretch-info">
        <MascotAnimation />
        <h2 className="hero-preview__name">Rubber Neck</h2>
      </div>
      <div className="hero-preview__timer" style={{ width: 155, height: 155 }}>
        <CircularProgressbarWithChildren
          counterClockwise
          value={60}
          styles={buildStyles({
            pathColor: 'var(--color-bg-accent)',
            trailColor: 'var(--color-bg-timer)',
            strokeLinecap: 'round',
          })}
        >
          <span className="stretch-timer__timer">0:08</span>
          <span className="stretch-timer__text">Time remaining</span>
        </CircularProgressbarWithChildren>
      </div>
      <span className="btn hero-preview__btn">Start session</span>
    </div>
  );
}
