import Toggle from '../common/Toggle';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import useSettings from '../../hooks/useSettings';
import Separator from '../common/Separator';
import SettingsRow from './SettingsRow';
import ReminderFrequency from './ReminderFrequency';

export default function DesktopSettings() {
  const {
    soundEnabled,
    quietHoursEnabled,
    quietHoursStart,
    quietHoursEnd,
    reminderIntervalMinutes,
    isCustomInterval,
    handleSoundToggle,
    handleQuietHoursToggle,
    handleQuietHoursStart,
    handleQuietHoursEnd,
    handleReminderInterval,
    error,
    saved,
  } = useSettings();

  return (
    <div className="profile-card">
      <SettingsRow
        title="Sound effects"
        description="A happy bark on completion"
        control={<Toggle checked={soundEnabled} onChange={handleSoundToggle} label="Sound effects" />}
      />

      <Separator />

      <SettingsRow
        title="Quiet hours"
        description="No nudges during this time"
        control={<Toggle checked={quietHoursEnabled} onChange={handleQuietHoursToggle} label="Quiet hours" />}
      />

      {quietHoursEnabled && (
        <div className="profile-card__row profile-card__row--indent">
          <label className="profile-card__row-label">
            From
            <input
              type="time"
              className="settings-time-input"
              value={quietHoursStart}
              onChange={(e) => handleQuietHoursStart(e.target.value)}
            />
          </label>
          <label className="profile-card__row-label">
            To
            <input
              type="time"
              className="settings-time-input"
              value={quietHoursEnd}
              onChange={(e) => handleQuietHoursEnd(e.target.value)}
            />
          </label>
        </div>
      )}

      <Separator />

      <SettingsRow
        title="Reminder frequency"
        description="How often to nudge you to stretch"
      />
      <ReminderFrequency
        intervalMinutes={reminderIntervalMinutes}
        isCustomInterval={isCustomInterval}
        onIntervalChange={handleReminderInterval}
      />

      {error && <ErrorMessage message={error} />}
      {saved && <SuccessMessage message="Settings saved" />}
    </div>
  );
}
