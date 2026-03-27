import { Link } from 'react-router-dom';

export function CategoryBadge({ category, small }: { category: string; small?: boolean }) {
  return (
    <Link
      to={`/kategori/${category.toLowerCase()}`}
      onClick={e => e.stopPropagation()}
      className={`inline-block font-bold uppercase tracking-wider text-accent dark:text-accent-dark hover:underline ${
        small ? 'text-[10px]' : 'text-xs'
      }`}
    >
      {category}
    </Link>
  );
}
