export function MockGrid() {
  return (
    <div className="grid grid-rows-7 grid-cols-6 gap-0.5 sm:gap-1 w-[96vw] max-w-lg">
      {[...Array(42)].map((_, i) => (
        <svg key={i} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="32" height="32" stroke="rgb(255, 255, 255, 0.1)" strokeWidth="2" />
        </svg>
      ))}
    </div>
  );
}