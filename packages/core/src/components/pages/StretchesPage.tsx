import { useEffect } from 'react';
import App from '../../App';
import PublicWrapper from '../pageWrappers/PublicWrapper';
import { useStretchContext } from '../../context/stretchContext/useStretchContext';

export default function StretchesPage() {
  const { reset } = useStretchContext();

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <PublicWrapper>
      <App />
    </PublicWrapper>
  );
}
