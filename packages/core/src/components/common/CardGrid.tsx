interface CardGridItem {
  title: string;
  text: string;
}

interface CardGridProps {
  items: CardGridItem[];
  columns?: number;
  variant?: 'accent' | 'white';
  ordered?: boolean;
}

export default function CardGrid({
  items,
  columns = items.length,
  variant = 'accent',
  ordered = true,
}: CardGridProps) {
  const List = ordered ? 'ol' : 'ul';

  return (
    <List
      className={`card-grid card-grid--${variant} card-grid--${ordered ? 'ordered' : 'unordered'}`}
      style={{ '--card-grid-columns': columns } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <li key={i} className="card-grid__item">
          <h4 className="card-grid__item-title">{item.title}</h4>
          <p className="card-grid__item-text">{item.text}</p>
        </li>
      ))}
    </List>
  );
}
