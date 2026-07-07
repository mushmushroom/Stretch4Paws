import { createContext } from 'react';
import type { Stretch } from '../../data/stretches';

export type Phase = 'idle' | 'stretch' | 'paused' | 'completed';

export interface StretchContextType {
  stretches: Stretch[];
  currentStretch: Stretch | null;
  phase: Phase;
  totalDuration: number;
  stretchTimeLeft: number;
  totalTimeLeft: number;
  currentStretchIndex: number;
  sessionSaveError: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export const StretchContext = createContext<StretchContextType | undefined>(undefined);
