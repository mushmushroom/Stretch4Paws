import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { FaPlay } from 'react-icons/fa';
import { useStretchContext } from '../context/StretchContext';
import { useEffect, useState } from 'react';

export default function StretchTimer() {
  const { stretches, currentStretchIndex, start, pause, isActive, handleCompleteBlock } =
    useStretchContext();

  const stretch = stretches[currentStretchIndex];

  const [timeLeft, setTimeLeft] = useState(stretch.duration);

  useEffect(() => {
    setTimeLeft(stretch.duration);
  }, [stretch]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, stretch]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      const timer = setTimeout(() => {
        handleCompleteBlock();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const progress = ((stretch.duration - timeLeft) / stretch.duration) * 100;
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
