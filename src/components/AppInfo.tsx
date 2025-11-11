import { FaPaw } from 'react-icons/fa';

export default function AppInfo() {
  return (
    <div className="app-info">
      <div className="app-info__icon">
        <FaPaw color="#FFFFFF" size={18} />
      </div>
      <div>
        <h1 className="app-info__title">Stretch4Paws</h1>
        <p className="app-info__descr">Quick desk stretches to refresh your mind and body.</p>
      </div>
    </div>
  );
}
