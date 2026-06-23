export function isToday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function isThisWeek(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  // compare local midnight to local midnight — no UTC shift
  const dateLocal = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return dateLocal >= startOfWeek;
}

export function toLocalDateStr(dateStr: string): string {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calcStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  // get unique local calendar days, sorted descending
  const days = [...new Set(dates.map(toLocalDateStr))].sort().reverse();

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days.length; i++) {
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);
    const expectedStr = toLocalDateStr(expected.toISOString());

    if (days[i] === expectedStr) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
