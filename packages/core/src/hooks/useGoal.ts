import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/authContext/useAuth';
import { upsertGoal } from '@stretch4paws/db';
import type { Goal } from '../lib/types';

export default function useGoal(): Goal {
  const { user, goal, refreshGoal } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(savedTimerRef.current), []);

  async function saveGoal(value: number) {
    if (!user) return;
    setSaveError(null);
    const { error } = await upsertGoal(user.id, value);
    if (error) {
      setSaveError(error.message);
      return;
    }
    await refreshGoal();
    setSaved(true);
    savedTimerRef.current = setTimeout(() => setSaved(false), 2000);
  }

  return { goal, goalLoading: false, saved, saveError, saveGoal };
}
