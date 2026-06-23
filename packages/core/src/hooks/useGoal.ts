import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext/useAuth';
import { fetchGoal, upsertGoal } from '@stretch4paws/db';

const DEFAULT_GOAL = 5;

export interface Goal {
  goal: number;
  goalLoading: boolean;
  updateGoal: (value: number) => Promise<void>;
}

export default function useGoal(): Goal {
  const { user, isLoading: authLoading } = useAuth();
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [goalLoading, setGoalLoading] = useState(true);

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

  async function updateGoal(value: number) {
    if (!user) return;
    setGoal(value);
    await upsertGoal(user.id, value);
  }

  return { goal, goalLoading, updateGoal };
}
