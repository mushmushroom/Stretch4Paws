import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { stretches as stretchData, type Stretch } from '../data/stretches';

type StretchContextType = {
  stretches: Stretch[];
  isActive: boolean;
  isCompleted: boolean;
  totalDuration: number;
  timeLeft: number;
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
export const StretchProvider: React.FC<StretchProviderProps> = ({ children }) => {
  const stretches = stretchData;

  const totalDuration = useMemo(() => {
    return stretches.reduce((sum, stretch) => sum + stretch.duration, 0) + stretches.length / 2;
  }, [stretches]);

  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);

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
  }, [isActive]);

  function handleCompleteBlock() {
    if (currentStretchIndex < stretches.length - 1) {
      setCurrentStretchIndex((prev) => prev + 1);
    } else {
      setIsActive(false);
      setIsCompleted(true);
    }
  }

  function pause() {
    setIsActive(false);
  }

  function start() {
    setIsActive(true);
  }

  function restart() {
    setCurrentStretchIndex(0);
    setTimeLeft(totalDuration);
    setIsActive(false);
    setIsCompleted(false);
  }

  return (
    <StretchContext.Provider
      value={{
        stretches,
        totalDuration,
        isActive,
        isCompleted,
        timeLeft,
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
