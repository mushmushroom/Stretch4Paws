import './style.scss';
import StretchDetails from './components/stretch/StretchDetails';
import GlobalSection from './components/stretch/GlobalSection';
import ThemeToggle from './components/common/ThemeToggle';

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
