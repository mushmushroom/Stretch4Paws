import { createContext } from 'react';
import type { Stretch } from '../../data/stretches';

export type Phase = 'idle' | 'stretch' | 'paused' | 'completed';

export type StretchContextType = {
  stretches: Stretch[];
  currentStretch: Stretch;
  phase: Phase;
  totalDuration: number;
  stretchTimeLeft: number;
  totalTimeLeft: number;
  currentStretchIndex: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export const StretchContext = createContext<StretchContextType | undefined>(undefined);
