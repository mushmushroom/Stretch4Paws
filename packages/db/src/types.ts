export interface ProfileSettings {
  sound_enabled?: boolean;
}

export interface Profile {
  id: string;
  name: string | null;
  settings: ProfileSettings;
}

export interface SessionRow {
  user_id: string;
  completed_at: string;
}

export interface GoalRow {
  user_id: string;
  sessions_per_day: number;
}
