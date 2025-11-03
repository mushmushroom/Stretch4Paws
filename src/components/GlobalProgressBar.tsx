export default function GlobalProgressBar() {
  return (
    <div className="global-progress-bar">
      <div className="global-progress-bar__text">
        <span>Overall progress</span>
        <span>1 out of 9 stretches</span>
      </div>
      <div className="global-progress-bar__container">
        <div className="global-progress-bar__fill"></div>
      </div>
    </div>
  );
}
