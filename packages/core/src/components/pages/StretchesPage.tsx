import { useEffect } from 'react';
import PublicWrapper from '../pageWrappers/PublicWrapper';
import StretchesSection from '../stretch/StretchesSection';
import { useStretchContext } from '../../context/stretchContext/useStretchContext';

export default function StretchesPage() {
  const { reset } = useStretchContext();

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <PublicWrapper>
      <StretchesSection />
    </PublicWrapper>
  );
}
