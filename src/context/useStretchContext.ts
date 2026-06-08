import { useContext } from 'react';
import { StretchContext } from './StretchContextDef';

export function useStretchContext() {
  const ctx = useContext(StretchContext);
  if (!ctx) {
    throw new Error('useStretchContext must be used within StretchProvider');
  }
  return ctx;
}
