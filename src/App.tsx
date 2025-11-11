// import './App.css'

import { StretchProvider } from './context/StretchContext';
import './style.scss';
import StretchDetails from './components/StretchDetails';
import GlobalSection from './components/GlobalSection';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <StretchProvider>
        <main className="main">
          <GlobalSection />
          <StretchDetails />
        </main>
        <ThemeToggle />
      </StretchProvider>
    </ThemeProvider>
  );
}

export default App;
