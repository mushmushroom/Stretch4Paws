import './style.scss';
import StretchDetails from './components/StretchDetails';
import GlobalSection from './components/GlobalSection';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <main className="main">
      <GlobalSection />
      <StretchDetails />
      <ThemeToggle />
    </main>
  );
}

export default App;
