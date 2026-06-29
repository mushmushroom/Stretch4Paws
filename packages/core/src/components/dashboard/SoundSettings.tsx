import Toggle from '../common/Toggle';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import useSettings from '../../hooks/useSettings';

export default function SoundSettings() {
  const { soundEnabled, handleSoundToggle, error, saved } = useSettings();

  return (
    <div className="profile-card">
      <div className="profile-card__row">
        <div>
          <h3 className="profile-card__row-title">Sound effects</h3>
          <p className="profile-card__row-text">A happy bark on completion</p>
        </div>
        <Toggle checked={soundEnabled} onChange={handleSoundToggle} label="Sound effects" />
      </div>
      {error && <ErrorMessage message={error} />}
      {saved && <SuccessMessage message="Settings saved" />}
    </div>
  );
}
