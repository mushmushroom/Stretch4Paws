import { useEffect, useState } from 'react';
import '@stretch4paws/core/style.scss';
import Providers from '@stretch4paws/core/components/common/Providers.js';
import StretchesSection from '@stretch4paws/core/components/stretch/StretchesSection.js';
import ThemeToggle from '@stretch4paws/core/components/common/ThemeToggle.js';
import DesktopHeader from '@stretch4paws/core/components/common/DesktopHeader.js';
import DesktopSettings from '@stretch4paws/core/components/dashboard/DesktopSettings.js';
import { setSession } from '@stretch4paws/db';

type DesktopView = 'stretches' | 'settings';

function AppInner() {
  const [view, setView] = useState<DesktopView>('stretches');

  useEffect(() => {
    window.electron.onAuthCallback(async ({ accessToken, refreshToken }) => {
      await setSession(accessToken, refreshToken);
    });
  }, []);

  return (
    <div className="public-wrapper">
      <DesktopHeader view={view} onViewChange={setView} />
      <main>
        {view === 'stretches' && <StretchesSection />}
        {view === 'settings' && <DesktopSettings />}
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
