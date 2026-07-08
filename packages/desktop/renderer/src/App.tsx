import { useEffect, useRef, useState } from 'react';

import '@stretch4paws/core/style.scss';
import Providers from '@stretch4paws/core/components/common/Providers.js';
import StretchesSection from '@stretch4paws/core/components/stretch/StretchesSection.js';
import ThemeToggle from '@stretch4paws/core/components/common/ThemeToggle.js';
import DesktopHeader from '@stretch4paws/core/components/common/DesktopHeader.js';
import DesktopSettings from '@stretch4paws/core/components/dashboard/DesktopSettings.js';
import ErrorMessage from '@stretch4paws/core/components/common/ErrorMessage.js';
import { setSession } from '@stretch4paws/db';
import type { DesktopView } from '@stretch4paws/core/lib/types';
import { useStretchContext } from '@stretch4paws/core/context/stretchContext/useStretchContext.js';

function AppInner() {
  const [view, setView] = useState<DesktopView>('stretches');
  const [authError, setAuthError] = useState<string | null>(null);
  const { phase, reset } = useStretchContext();
  const phaseRef = useRef(phase);

  useEffect(() => {
    return window.electron?.onAuthCallback(async ({ accessToken, refreshToken }) => {
      try {
        await setSession(accessToken, refreshToken);
        setAuthError(null);
      } catch (err) {
        console.error('[auth-callback] Failed to set session:', err);
        setAuthError('Sign-in succeeded but your session could not be saved. Please try again.');
      }
    });
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    return window.electron?.onFocusStretches(() => {
      setView('stretches');
      if (phaseRef.current === 'completed') reset();
    });
  }, [reset]);

  return (
    <div className="public-wrapper">
      <DesktopHeader view={view} onViewChange={setView} />
      {authError && <ErrorMessage message={authError} />}
      <main>
        {view === 'stretches' && <StretchesSection />}
        <div style={{ display: view === 'settings' ? undefined : 'none' }}>
          <DesktopSettings />
        </div>
      </main>
      <ThemeToggle />
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <AppInner />
    </Providers>
  );
}
