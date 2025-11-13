import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { FaPlay } from 'react-icons/fa';
import { useStretchContext } from '../context/StretchContext';

export default function StretchTimer() {
  const { stretchTimeLeft, currentStretch, start, pause, isActive, handleCompleteBlock } =
    useStretchContext();


  const minutes = Math.floor((stretchTimeLeft % 3600) / 60);
  const seconds = stretchTimeLeft % 60;

  const progress = ((currentStretch.duration - stretchTimeLeft) / currentStretch.duration) * 100;
  return (
    <section className="section stretch-timer">
      <div className="stretch-timer__container" style={{ width: 155, height: 155 }}>
        <CircularProgressbarWithChildren
          counterClockwise
          value={progress}
          styles={buildStyles({
            pathColor: 'var(--color-emerald)',
            trailColor: 'var(--color-bg-secondary)',
            strokeLinecap: 'round',
            pathTransition: progress === 0 ? 'none' : 'stroke-dashoffset 1s linear 0s',
          })}
        >
          <span className="stretch-timer__timer">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
          <span className="stretch-timer__text">Time remaining</span>
        </CircularProgressbarWithChildren>
      </div>

      <button className="btn" onClick={isActive ? pause : start}>
        <FaPlay />
        <span>{isActive ? 'Pause' : 'Start'}</span>
      </button>
    </section>
  );
}
