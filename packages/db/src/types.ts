export interface Profile {
  id: string;
  name: string | null;
}

export interface SessionRow {
  user_id: string;
  completed_at: string;
}

export interface GoalRow {
  user_id: string;
  sessions_per_day: number;
}
