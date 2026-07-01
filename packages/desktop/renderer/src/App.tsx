import { useEffect } from 'react';
import '@stretch4paws/core/style.scss';
import Providers from '@stretch4paws/core/components/common/Providers.js';
import StretchesSection from '@stretch4paws/core/components/stretch/StretchesSection.js';
import ThemeToggle from '@stretch4paws/core/components/common/ThemeToggle.js';
import DesktopHeader from '@stretch4paws/core/components/common/DesktopHeader.js';
import { setSession } from '@stretch4paws/db';

function AppInner() {
  useEffect(() => {
    window.electron.onAuthCallback(async ({ accessToken, refreshToken }) => {
      await setSession(accessToken, refreshToken);
    });
  }, []);

  return (
    <div className="public-wrapper">
      <DesktopHeader />
      <main>
        <StretchesSection />
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
