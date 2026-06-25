import { Link } from 'react-router';

interface DashboardHeaderProps {
  title: string;
  text?: string;
  back?: string;
}

export default function DashboardHeader({ title, text, back }: DashboardHeaderProps) {
  return (
    <div className="dashboard-header">
      {back && (
        <Link className="dashboard-header__back" to={back}>
          ← Back
        </Link>
      )}
      <h1 className="dashboard-header__title">{title}</h1>
      {text && <p className="dashboard-header__text">{text}</p>}
    </div>
  );
}
