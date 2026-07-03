import { useState } from 'react';
import { REMINDER_PRESETS } from '../../lib/constants';

interface ReminderFrequencyProps {
  intervalMinutes: number;
  isCustomInterval: boolean;
  onIntervalChange: (minutes: number) => void;
}

export default function ReminderFrequency({
  intervalMinutes,
  isCustomInterval,
  onIntervalChange,
}: ReminderFrequencyProps) {
  const [customMinutes, setCustomMinutes] = useState(
    isCustomInterval ? String(intervalMinutes) : ''
  );
  const [showCustomInput, setShowCustomInput] = useState(isCustomInterval);

  function saveCustom() {
    const mins = parseInt(customMinutes);
    if (!isNaN(mins) && mins > 0) onIntervalChange(mins);
  }

  return (
    <>
      <div className="profile-card__row profile-card__row--indent">
        {REMINDER_PRESETS.map((preset) => (
          <button
            key={preset.value}
            className={`btn btn--ghost${intervalMinutes === preset.value && !showCustomInput ? ' btn--active' : ''}`}
            onClick={() => { setShowCustomInput(false); onIntervalChange(preset.value); }}
          >
            {preset.label}
          </button>
        ))}
        <button
          className={`btn btn--ghost${showCustomInput ? ' btn--active' : ''}`}
          onClick={() => setShowCustomInput((v) => !v)}
        >
          Custom
        </button>
      </div>

      {showCustomInput && (
        <div className="profile-card__row profile-card__row--indent">
          <label className="profile-card__row-label">
            Every
            <input
              type="number"
              className="settings-time-input"
              min={1}
              max={480}
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') saveCustom(); }}
              style={{ width: '7rem' }}
            />
            minutes
          </label>
          <button className="btn btn--outline" onClick={saveCustom}>
            Save
          </button>
        </div>
      )}
    </>
  );
}
