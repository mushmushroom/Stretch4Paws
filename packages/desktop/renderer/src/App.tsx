import '@stretch4paws/core/style.scss';
// import { AuthProvider } from '@stretch4paws/core/context/authContext/AuthContext.js';
// import { StretchProvider } from '@stretch4paws/core/context/stretchContext/StretchContext.js';
// import StretchesPage from '@stretch4paws/core/components/pages/StretchesPage.js';
import Providers from '@stretch4paws/core/components/common/Providers.js';
import StretchesSection from '@stretch4paws/core/components/stretch/StretchesSection.js';

export default function App() {
  return (
    <Providers>
      <StretchesSection />
    </Providers>
  );
}
