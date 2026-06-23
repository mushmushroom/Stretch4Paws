import { ThemeProvider } from '../../context/themeContext/ThemeContext';
import { StretchProvider } from '../../context/stretchContext/StretchContext';
import { AuthProvider } from '../../context/authContext/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StretchProvider>{children}</StretchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
