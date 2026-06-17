import { useStretchContext } from '../context/stretchContext/useStretchContext';
import AppInfo from './AppInfo';
import GlobalProgressBar from './GlobalProgressBar';
import Logo from './Logo';
import ResetButton from './ResetButton';

export default function GlobalSection() {
  const { totalTimeLeft, totalDuration } = useStretchContext();
  return (
    <section className="section global-section">
      <div className="global-section__top">
        {/* <AppInfo /> */}
        <Logo text={true} />
        {totalTimeLeft < totalDuration && <ResetButton />}
      </div>
      <GlobalProgressBar />
    </section>
  );
}
