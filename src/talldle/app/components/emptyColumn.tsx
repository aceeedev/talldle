export function EmptyColumn() {
  return (
      <div className="grid grid-rows-7 gap-0.5 sm:gap-1">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="border-4 sm:border-6 border-[var(--dark-accent)] opacity-25 aspect-square" />
        ))}
      </div>
      
      // <div className="grid grid-rows-7 gap-0.5 sm:gap-1">
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      // </div>

      // <div className="grid grid-rows-7 gap-0.5 sm:gap-1">
      //   <div className="row-span-2 border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="row-span-2 border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      //   <div className="border-2 sm:border-4 border-[var(--dark-accent)] opacity-35"></div>
      // </div>
  );
}