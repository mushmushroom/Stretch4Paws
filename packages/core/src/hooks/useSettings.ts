import { useEffect, useState } from 'react';
import { updateProfileSettings } from '@stretch4paws/db';
import { useAuth } from '../context/authContext/useAuth';

export default function useSettings() {
  const { profile, user, refreshProfile } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setSoundEnabled(profile.settings?.sound_enabled ?? true);
  }, [profile]);

  async function handleSoundToggle(value: boolean) {
    setSoundEnabled(value);
    setError(null);
    setSaved(false);
    if (!user) return;
    const { error: updateError } = await updateProfileSettings(user.id, {
      ...profile?.settings,
      sound_enabled: value,
    });
    if (updateError) {
      setError(updateError.message);
    } else {
      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 5000);
    }
  }

  return { soundEnabled, handleSoundToggle, error, saved };
}
