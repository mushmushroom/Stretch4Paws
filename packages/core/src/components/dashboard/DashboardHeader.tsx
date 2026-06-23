import React from 'react'

interface DashboardHeaderProps {
  title: string;
  text: string;
}
export default function DashboardHeader({title, text}: DashboardHeaderProps) {
  return (
    <div className="dashboard-header">
      <h1 className="dashboard-header__title">{title}</h1>
      <p className="dashboard-header__text">{text}</p>
    </div>
  );
}
