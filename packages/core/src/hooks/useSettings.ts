import { useEffect, useRef, useState } from 'react';
import { updateProfileSettings } from '@stretch4paws/db';
import { useAuth } from '../context/authContext/useAuth';

export default function useSettings() {
  const { profile, user, refreshProfile } = useAuth();
  const soundEnabled = profile?.settings?.sound_enabled ?? true;
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(savedTimerRef.current), []);

  async function handleSoundToggle(value: boolean) {
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
      savedTimerRef.current = setTimeout(() => setSaved(false), 5000);
    }
  }

  return { soundEnabled, handleSoundToggle, error, saved };
}
