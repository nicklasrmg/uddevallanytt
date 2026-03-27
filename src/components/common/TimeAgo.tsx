function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);

  if (diffMin < 1) return 'Just nu';
  if (diffMin < 60) return `${diffMin} min sedan`;
  if (diffH < 24) return `${diffH} tim sedan`;
  if (diffD < 7) return `${diffD} dagar sedan`;

  return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function TimeAgo({ date, className }: { date: string; className?: string }) {
  return (
    <time dateTime={date} className={className}>
      {formatTimeAgo(date)}
    </time>
  );
}
