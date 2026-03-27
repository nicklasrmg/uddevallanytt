export function CategoryBadge({ category, small }: { category: string; small?: boolean }) {
  return (
    <span
      className={`inline-block font-bold uppercase tracking-wider text-accent dark:text-accent-dark ${
        small ? 'text-[10px]' : 'text-xs'
      }`}
    >
      {category}
    </span>
  );
}
