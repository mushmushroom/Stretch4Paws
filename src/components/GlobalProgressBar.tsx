import { useStretchContext } from "../context/StretchContext";

export default function GlobalProgressBar() {

  const { stretches, currentStretchIndex, totalDuration, totalTimeLeft } = useStretchContext();
  const progress = ((totalDuration - totalTimeLeft) / totalDuration) * 100;

  return (
    <div className="global-progress-bar">
      <div className="global-progress-bar__text">
        <span>Overall progress</span>
        <span>
          {currentStretchIndex + 1} out of {stretches.length} stretches
        </span>
      </div>
      <div className="global-progress-bar__container">
        <div className="global-progress-bar__fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
