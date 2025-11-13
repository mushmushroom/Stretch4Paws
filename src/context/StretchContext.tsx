import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { stretches as stretchData, type Stretch } from '../data/stretches';

type StretchContextType = {
  stretches: Stretch[];
  currentStretch: Stretch;
  isActive: boolean;
  isCompleted: boolean;
  totalDuration: number;
  stretchTimeLeft: number;
  totalTimeLeft: number;
  currentStretchIndex: number;
  handleCompleteBlock: () => void;
  pause: () => void;
  start: () => void;
  restart: () => void;
};
const StretchContext = createContext<StretchContextType | undefined>(undefined);

interface StretchProviderProps {
  children: ReactNode;
}

const TRANSITION_DELAY = 1; //in seconds

export const StretchProvider: React.FC<StretchProviderProps> = ({ children }) => {
  const stretches = stretchData;

  const totalDuration = useMemo(() => {
    return (
      stretches.reduce((sum, stretch) => sum + stretch.duration, 0) +
      (stretches.length - 1) * TRANSITION_DELAY
    );
  }, [stretches]);

  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalTimeLeft, setTotalTimeLeft] = useState(totalDuration);
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);
  const currentStretch = stretches[currentStretchIndex];
  const [stretchTimeLeft, setStretchTimeLeft] = useState(currentStretch.duration);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTotalTimeLeft((prev) => Math.max(prev - 1, 0));
      setStretchTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleCompleteBlock = useCallback(() => {
    {
      if (currentStretchIndex < stretches.length - 1) {
        const next = currentStretchIndex + 1;
        setCurrentStretchIndex(next);
        setStretchTimeLeft(stretches[next].duration);
      } else {
        setIsActive(false);
        setIsCompleted(true);
      }
    }
  }, [currentStretchIndex, stretches]);

  useEffect(() => {
    if (stretchTimeLeft === 0 && isActive) {
      // handleCompleteBlock();
      const timer = setTimeout(() => {
        handleCompleteBlock();
      }, TRANSITION_DELAY * 1000);
      return () => clearTimeout(timer);
    }
  }, [stretchTimeLeft, isActive, handleCompleteBlock]);

  function pause() {
    setIsActive(false);
  }

  function start() {
    setIsActive(true);
  }

  function restart() {
    setCurrentStretchIndex(0);
    setTotalTimeLeft(totalDuration);
    setIsActive(false);
    setIsCompleted(false);
    setStretchTimeLeft(stretches[0].duration);
  }

  return (
    <StretchContext.Provider
      value={{
        stretches,
        totalDuration,
        currentStretch,
        isActive,
        isCompleted,
        totalTimeLeft,
        stretchTimeLeft,
        currentStretchIndex,
        handleCompleteBlock,
        pause,
        start,
        restart,
      }}
    >
      {' '}
      {children}
    </StretchContext.Provider>
  );
};

export function useStretchContext() {
  const context = useContext(StretchContext);
  if (context === undefined) {
    throw new Error('useStretchContext must be used within a StretchProvider');
  }
  return context;
}
