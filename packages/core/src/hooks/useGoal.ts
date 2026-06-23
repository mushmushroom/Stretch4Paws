import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext/useAuth';
import { fetchGoal, upsertGoal } from '@stretch4paws/db';
import type { Goal } from '../lib/types';
import { DEFAULT_GOAL } from '../lib/constants';

export default function useGoal(): Goal {
  const { user, isLoading: authLoading } = useAuth();
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [goalLoading, setGoalLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setGoalLoading(false);
      return;
    }

    setGoalLoading(true);
    fetchGoal(user.id).then(({ data }) => {
      if (data) setGoal(data.sessions_per_day);
      setGoalLoading(false);
    });
  }, [user, authLoading]);

  async function saveGoal(value: number) {
    if (!user) return;
    setGoal(value);
    await upsertGoal(user.id, value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return { goal, goalLoading, saved, saveGoal };
}
