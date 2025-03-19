'use client';
import { Guess, GuessColor } from "./../useGameState"
import { RowDiv } from "./rowDiv"

export function HistoryColumn({ order }: { order: Array<Guess> }) {  
  return (
    <div className="grid grid-rows-7 gap-0.5 sm:gap-1 opacity-70">
      {order?.length > 0 ? (
        order.map((item) => ( item.color == GuessColor.Gray || item.color == GuessColor.Green ? (
          <div key={item.id} className={`${item.color == GuessColor.Green ? 'no-drag border-green-500' : 'border-[var(--dark-accent)]'} row-span-1 border-2 sm:border-4 overflow-clip hover:cursor-pointer`}>
            <img src={item.celebs[0].imgUrl} alt={item.celebs[0].name} className="object-cover" />
          </div>
        ) : (
          <RowDiv rows={item.celebs.length} key={item.id}>
            {item.celebs.map((celeb) => (
              <div>
                <img src={celeb.imgUrl} alt={celeb.name} className="object-cover" />
              </div>
            ))}
          </RowDiv>
        )))
      ) : (
        [...Array(7)].map((_, i) => (
          <div key={i} className="no-drag border-2 sm:border-4 bg-[var(--dark-accent)] border-[var(--dark-accent)] opacity-35 aspect-square"></div>
        ))
      )}
    </div>
  );
};