export interface Goal {
  goal: number;
  goalLoading: boolean;
  saved: boolean;
  saveGoal: (value: number) => Promise<void>;
}

export interface Stats {
  today: number;
  thisWeek: number;
  streak: number;
  goalProgress: number; // 0–100
  perDay: number[]; // Sun–Sat, count for current week
  isLoading: boolean;
}