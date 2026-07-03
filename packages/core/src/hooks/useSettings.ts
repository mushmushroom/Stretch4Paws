import { useEffect, useRef, useState } from 'react';
import { updateProfileSettings } from '@stretch4paws/db';
import { useAuth } from '../context/authContext/useAuth';
import { DEFAULT_SETTINGS, REMINDER_PRESETS } from '../lib/constants';
import type { ProfileSettings } from '@stretch4paws/db';

const LOCAL_SETTINGS_KEY = 'stretch4paws_settings';

function loadLocalSettings(): ProfileSettings {
  try {
    const raw = localStorage.getItem(LOCAL_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalSettings(settings: ProfileSettings) {
  localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
}

export default function useSettings() {
  const { profile, user, refreshProfile } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const [localSettings, setLocalSettings] = useState<ProfileSettings>(() => loadLocalSettings());
  const syncedRef = useRef(false);

  useEffect(() => () => clearTimeout(savedTimerRef.current), []);

  // When user logs in for the first time in this session, merge local → Supabase
  // so guest changes are not lost (local wins for any key that was explicitly set)
  useEffect(() => {
    if (!user || !profile || syncedRef.current) return;
    syncedRef.current = true;

    const local = loadLocalSettings();
    if (Object.keys(local).length === 0) return; // nothing local to merge

    const merged = { ...profile.settings, ...local };
    void updateProfileSettings(user.id, merged).then(() => refreshProfile());
  }, [user, profile]);

  // When logged in, Supabase is source of truth (already synced from local on login)
  const settings = user ? (profile?.settings ?? localSettings) : localSettings;

  const soundEnabled = settings.sound_enabled ?? DEFAULT_SETTINGS.SOUND_ENABLED;
  const quietHoursEnabled = settings.quiet_hours_enabled ?? DEFAULT_SETTINGS.QUIET_HOURS;
  const quietHoursStart = settings.quiet_hours_start ?? DEFAULT_SETTINGS.QUIET_HOURS_START;
  const quietHoursEnd = settings.quiet_hours_end ?? DEFAULT_SETTINGS.QUIET_HOURS_END;
  const reminderIntervalMinutes = settings.reminder_interval_minutes ?? DEFAULT_SETTINGS.REMINDER_INTERVAL_MINUTES;
  const isCustomInterval = !REMINDER_PRESETS.some((p) => p.value === reminderIntervalMinutes);

  function showSaved() {
    setSaved(true);
    savedTimerRef.current = setTimeout(() => setSaved(false), 5000);
  }

  async function updateSettings(patch: Partial<ProfileSettings>) {
    setError(null);
    setSaved(false);
    const merged = { ...settings, ...patch };

    // Always persist to localStorage
    saveLocalSettings(merged);
    setLocalSettings(merged);

    // Also sync to Supabase when logged in
    if (user) {
      const { error: updateError } = await updateProfileSettings(user.id, merged);
      if (updateError) {
        setError(updateError.message);
        return;
      }
      await refreshProfile();
    }

    showSaved();
  }

  function handleSoundToggle(value: boolean) {
    return updateSettings({ sound_enabled: value });
  }

  function handleQuietHoursToggle(value: boolean) {
    return updateSettings({ quiet_hours_enabled: value });
  }

  function handleQuietHoursStart(value: string) {
    return updateSettings({ quiet_hours_start: value });
  }

  function handleQuietHoursEnd(value: string) {
    return updateSettings({ quiet_hours_end: value });
  }

  function handleReminderInterval(minutes: number) {
    return updateSettings({ reminder_interval_minutes: minutes });
  }

  return {
    soundEnabled,
    quietHoursEnabled,
    quietHoursStart,
    quietHoursEnd,
    handleSoundToggle,
    handleQuietHoursToggle,
    handleQuietHoursStart,
    handleQuietHoursEnd,
    reminderIntervalMinutes,
    isCustomInterval,
    handleReminderInterval,
    error,
    saved,
  };
}
