import { useState } from 'react';
import DashboardWrapper from '../pageWrappers/DashboardWrapper';
import DashboardHeader from './DashboardHeader';
import useGoal from '../../hooks/useGoal';

const MIN = 1;
const MAX = 14;

export default function GoalsPage() {
  const { goal, goalLoading, updateGoal } = useGoal();
  const [draft, setDraft] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const current = draft ?? goal;
  const percent = ((current - MIN) / (MAX - MIN)) * 100;

  async function handleSave() {
    await updateGoal(current);
    setDraft(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <DashboardWrapper>
      <div className="goal-page">
        <DashboardHeader title="Set your goals" text="Small, paw-sized targets that stick." />
        <div className="goal-card">
          <div className="goal-card__header">
            <div>
              <h3 className="goal-card__title">Daily stretch goal</h3>
              <p className="goal-card__text">How many sessions do you want to complete per week?</p>
            </div>
            <div className="goal-card__value">
              {goalLoading ? '—' : current}
            </div>
          </div>
          <div className="goal-card__slider-wrap">
            <input
              className="goal-slider"
              type="range"
              min={MIN}
              max={MAX}
              value={goalLoading ? MIN : current}
              disabled={goalLoading}
              style={{ '--goal-slider-fill': `${percent}%` } as React.CSSProperties}
              onChange={(e) => setDraft(Number(e.target.value))}
            />
            <div className="goal-card__range-labels">
              <span>{MIN}</span>
              <span>{MAX}</span>
            </div>
          </div>
          <button className="btn" onClick={handleSave} disabled={goalLoading}>
            {saved ? 'Saved!' : 'Save goal'}
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
}
