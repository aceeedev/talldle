'use client';
import { Guess } from "./../useGameState"


export function HistoryColumn({ order }: { order: Array<Guess> }) {  
  return (
    <div className="grid grid-rows-7 gap-0.5 sm:gap-1 opacity-50">
      {order?.length > 0 ? (
        order.map((item) => (
          <div key={item.celebs[0].id} className="border-2 sm:border-4 border-[var(--dark-accent)] overflow-clip hover:cursor-pointer select-none">
            <img src={item.celebs[0].imgUrl} alt={item.celebs[0].name} className="object-cover" />
          </div>
        ))
      ) : (
        [...Array(7)].map((_, i) => (
          <div key={i} className="no-drag border-2 sm:border-4 bg-[var(--dark-accent)] border-[var(--dark-accent)] opacity-35 aspect-square"></div>
        ))
      )}
    </div>
  );
};