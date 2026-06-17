import { FaPaw } from 'react-icons/fa';

interface LogoProps {
  text?: boolean;
}
export default function Logo({ text = false }: LogoProps) {
  return (
    <div className="logo">
      <div className="logo__icon">
        <FaPaw color="var(--color-bg-sec)" size={18} />
      </div>
      <div>
        <h1 className="logo__title">Stretch4Paws</h1>
        {text && (
          <p className="logo__descr">Quick desk stretches to refresh your mind and body.</p>
        )}
      </div>
    </div>
  );
}
