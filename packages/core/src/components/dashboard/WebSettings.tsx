import Toggle from '../common/Toggle';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import useSettings from '../../hooks/useSettings';
import SettingsRow from './SettingsRow';

export default function WebSettings() {
  const { soundEnabled, handleSoundToggle, error, saved } = useSettings();

  return (
    <div className="profile-card">
      <SettingsRow
        title="Sound effects"
        description="A happy bark on completion"
        control={<Toggle checked={soundEnabled} onChange={handleSoundToggle} label="Sound effects" />}
      />
      {error && <ErrorMessage message={error} />}
      {saved && <SuccessMessage message="Settings saved" />}
    </div>
  );
}
