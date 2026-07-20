export type DesktopView = 'stretches' | 'settings';

export interface Goal {
  goal: number;
  goalLoading: boolean;
  saved: boolean;
  saveError: string | null;
  saveGoal: (value: number) => Promise<void>;
}

export interface MonthlyStats {
  totalStretches: number;
  weeklyAverage: number;
  bestMonth: string;
  perMonth: number[]; // 6 entries, index 0 = oldest month
  monthLabels: string[]; // e.g. ['Jan', 'Feb', ...]
  isLoading: boolean;
}

export interface Stats {
  today: number;
  thisWeek: number;
  streak: number;
  goalProgress: number; // 0–100
  perDay: number[]; // Sun–Sat, count for current week
  isLoading: boolean;
}