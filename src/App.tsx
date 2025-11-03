// import './App.css'
import GlobalSection from './components/GlobalSection';
import StretchInfo from './components/StretchInfo';
import StretchTimer from './components/StretchTimer';
import './style.scss';

function App() {
  return (
    <main className="main">
      <GlobalSection />
      <StretchInfo />
      <StretchTimer />
    </main>
  );
}

export default App;
