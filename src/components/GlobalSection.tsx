import { useStretchContext } from '../context/StretchContext';
import AppInfo from './AppInfo';
import GlobalProgressBar from './GlobalProgressBar';
import RestartButton from './RestartButton';

export default function GlobalSection() {
  const { totalTimeLeft, totalDuration } = useStretchContext();
  return (
    <section className="section global-section">
      <div className="global-section__top">
        <AppInfo />
        {totalTimeLeft < totalDuration && <RestartButton />}
      </div>
      <GlobalProgressBar />
    </section>
  );
}
