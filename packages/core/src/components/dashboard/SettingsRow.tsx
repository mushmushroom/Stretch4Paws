import type { ReactNode } from 'react';

interface SettingsRowProps {
  title: string;
  description: ReactNode;
  control?: ReactNode;
}

export default function SettingsRow({ title, description, control }: SettingsRowProps) {
  return (
    <div className="profile-card__row">
      <div>
        <h3 className="profile-card__row-title">{title}</h3>
        <p className="profile-card__row-text">{description}</p>
      </div>
      {control}
    </div>
  );
}
