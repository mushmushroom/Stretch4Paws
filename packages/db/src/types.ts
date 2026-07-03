export interface ProfileSettings {
  sound_enabled?: boolean;
  quiet_hours_enabled?: boolean;
  quiet_hours_start?: string;
  quiet_hours_end?: string;
  reminder_interval_minutes?: number;
}

export interface Profile {
  id: string;
  name: string | null;
  settings: ProfileSettings;
}

export interface DailyStatRow {
  date: string;
  sessions_completed: number;
}

export interface SessionRow {
  user_id: string;
  completed_at: string;
}

export interface GoalRow {
  user_id: string;
  sessions_per_day: number;
}
