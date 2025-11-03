import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { FaPlay } from 'react-icons/fa';

export default function StretchTimer() {
  return (
    <section className="section stretch-timer">
      <div className="stretch-timer__container" style={{ width: 145, height: 145 }}>
        <CircularProgressbarWithChildren
          counterClockwise
          value={20}
          styles={buildStyles({
            pathColor: '#7CC6C6',
            trailColor: '#E8E8E8',
            strokeLinecap: 'round',
          })}
        >
          <span className="stretch-timer__timer">00:10</span>
          <span className="stretch-timer__text">Time remaining</span>
        </CircularProgressbarWithChildren>
      </div>

      <button className="btn">
        <FaPlay />
        <span>Start</span>
      </button>
    </section>
  );
}
