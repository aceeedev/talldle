export function EmptyColumn() {
  return (
      <div className="grid gap-0.5 sm:gap-1">
        {[...Array(7)].map((_, i) => (
          <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35">
          </div>
        ))}
      </div>
  );
}