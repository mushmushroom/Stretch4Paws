import { useState } from 'react';
import DashboardWrapper from '../pageWrappers/DashboardWrapper';
import DashboardHeader from './DashboardHeader';
import useGoal from '../../hooks/useGoal';
import { MAX_GOAL, MIN_GOAL } from '../../lib/constants';
import ErrorMessage from '../common/ErrorMessage';

export default function GoalsPage() {
  const { goal, goalLoading, saved, saveError, saveGoal } = useGoal();
  const [draft, setDraft] = useState<number | null>(null);

  const current = draft ?? goal;
  const percent = ((current - MIN_GOAL) / (MAX_GOAL - MIN_GOAL)) * 100;

  async function handleSave() {
    await saveGoal(current);
    setDraft(null);
  }

  return (
    <DashboardWrapper>
      <div className="goal-page">
        <DashboardHeader title="Set your goals" text="Small, paw-sized targets that stick." />
        <div className="goal-card">
          <div className="goal-card__header">
            <div>
              <h3 className="goal-card__title">Daily stretch goal</h3>
              <p className="goal-card__text">How many sessions do you want to complete per day?</p>
            </div>
            <div className="goal-card__value">{goalLoading ? '—' : current}</div>
          </div>
          <div className="goal-card__slider-wrap">
            <input
              className="goal-slider"
              type="range"
              min={MIN_GOAL}
              max={MAX_GOAL}
              value={goalLoading ? MIN_GOAL : current}
              disabled={goalLoading}
              aria-label="Daily stretch goal"
              style={{ '--goal-slider-fill': `${percent}%` } as React.CSSProperties}
              onChange={(e) => setDraft(Number(e.target.value))}
            />
            <div className="goal-card__range-labels">
              <span>{MIN_GOAL}</span>
              <span>{MAX_GOAL}</span>
            </div>
          </div>
          {saveError && <ErrorMessage message={saveError} />}
          <button className="btn" onClick={handleSave} disabled={goalLoading}>
            {saved ? 'Saved!' : 'Save goal'}
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
}
