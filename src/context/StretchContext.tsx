import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { stretches as stretchData } from '../data/stretches';
import { StretchContext } from './StretchContextDef';

const TRANSITION_DELAY = 1; // seconds

interface StretchProviderProps {
  children: ReactNode;
}

export const StretchProvider: React.FC<StretchProviderProps> = ({ children }) => {
  const stretches = stretchData;

  /* -----------------------------
     Derived data
  ----------------------------- */

  const totalDuration = useMemo(() => {
    return (
      stretches.reduce((sum, s) => sum + s.duration, 0) + (stretches.length - 1) * TRANSITION_DELAY
    );
  }, [stretches]);

  /* -----------------------------
     Core state
  ----------------------------- */

  const [phase, setPhase] = useState<'idle' | 'stretch' | 'paused' | 'completed'>('idle');
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);
  const currentStretch = stretches[currentStretchIndex] ?? null;

  const [stretchTimeLeft, setStretchTimeLeft] = useState(
    currentStretch ? currentStretch.duration : 0
  );
  const [totalTimeLeft, setTotalTimeLeft] = useState(totalDuration);
  const transitionTimeoutRef = useRef<number | null>(null);

  /* -----------------------------
     Stretch timer (runs only in stretch)
  ----------------------------- */

  useEffect(() => {
    if (phase !== 'stretch') return;

    const interval = setInterval(() => {
      setStretchTimeLeft((t) => Math.max(t - 1, 0));
      setTotalTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  /* -----------------------------
     Handle stretch  > next
     Reset stretch timer on index change
  ----------------------------- */

  useEffect(() => {
    if (phase !== 'stretch' || stretchTimeLeft !== 0) return;

    transitionTimeoutRef.current = setTimeout(() => {
      if (currentStretchIndex >= stretches.length - 1) {
        // Last stretch completed
        setPhase('completed');
      } else {
        // Move to next stretch
        const next = currentStretchIndex + 1;
        setCurrentStretchIndex(next);
        setStretchTimeLeft(stretches[next].duration);
        setPhase('stretch');
      }
    }, TRANSITION_DELAY * 1000);

    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [phase, stretchTimeLeft, currentStretchIndex, stretches.length]);

  /* -----------------------------
     Controls
  ----------------------------- */

  function start() {
    if (phase === 'completed' || phase === 'idle') {
      setCurrentStretchIndex(0);
      setStretchTimeLeft(stretches[0].duration);
      setTotalTimeLeft(totalDuration);
    }
    setPhase('stretch');
  }

  function pause() {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    setPhase('paused');
  }

  function reset() {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    setCurrentStretchIndex(0);
    setStretchTimeLeft(stretches[0].duration);
    setTotalTimeLeft(totalDuration);
    setPhase('idle');
  }

  /* -----------------------------
     Context value
  ----------------------------- */

  return (
    <StretchContext.Provider
      value={{
        stretches,
        currentStretch,
        phase,
        totalDuration,
        stretchTimeLeft,
        totalTimeLeft,
        currentStretchIndex,
        start,
        pause,
        reset,
      }}
    >
      {children}
    </StretchContext.Provider>
  );
};
