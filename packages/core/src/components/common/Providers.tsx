import { ThemeProvider } from '../../context/themeContext/ThemeContext';
import { StretchProvider } from '../../context/stretchContext/StretchContext';
import { AuthProvider } from '../../context/authContext/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StretchProvider>
        <AuthProvider>{children}</AuthProvider>
      </StretchProvider>
    </ThemeProvider>
  );
}
