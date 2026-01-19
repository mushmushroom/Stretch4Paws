import { useStretchContext } from '../context/StretchContext';
import StretchCompleted from './StretchCompleted';
import StretchInfo from './StretchInfo';
import StretchTimer from './StretchTimer';

export default function StretchDetails() {
  const { phase } = useStretchContext();
  return (
    <>
      {phase === 'completed' ? (
        <StretchCompleted />
      ) : (
        <>
          <StretchInfo />
          <StretchTimer />
        </>
      )}
    </>
  );
}
