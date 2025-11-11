import { useStretchContext } from '../context/StretchContext';
import AppInfo from './AppInfo';
import GlobalProgressBar from './GlobalProgressBar';
import RestartButton from './RestartButton';

export default function GlobalSection() {
  const { timeLeft, totalDuration } = useStretchContext();
  return (
    <section className="section global-section">
      <div className="global-section__top">
        <AppInfo />
        {timeLeft < totalDuration && <RestartButton />}
      </div>
      <GlobalProgressBar />
    </section>
  );
}
