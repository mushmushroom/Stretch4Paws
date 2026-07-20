import type { ReactNode } from 'react';

interface PageHeroProps {
  title: ReactNode;
  description: string;
  actions: ReactNode;
  children: ReactNode;
}

export default function PageHero({ title, description, actions, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__info">
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__descr">{description}</p>
        <div className="page-hero__actions">{actions}</div>
      </div>
      <div className="page-hero__preview">{children}</div>
    </section>
  );
}
