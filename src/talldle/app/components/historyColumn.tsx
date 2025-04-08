'use client';
import { Guess, GuessColor } from "./../useGameState"
import { RowDiv } from "./rowDiv"

export function HistoryColumn({ order }: { order: Array<Guess> }) {  
  return (
    <div className="grid grid-rows-7 gap-0.5 sm:gap-1">
      {order?.length > 0 ? (
        order.map((item) => ( item.color == GuessColor.Gray || item.color == GuessColor.Green ? (
          <div key={item.celebs[0].id} className={`${item.color == GuessColor.Green ? 'no-drag border-green-400' : 'border-neutral-600'} row-span-1 border-4 sm:border-6 overflow-clip hover:cursor-pointer`}>
            <img src={item.celebs[0].image} alt={item.celebs[0].name} className="object-cover aspect-square object-top brightness-70" />
          </div>
        ) : (
          <RowDiv rows={item.celebs.length} key={item.id}>
            {item.celebs.map((celeb) => (
              <div key={celeb.id} className="border-4 sm:border-6 border-yellow-400">
                <img src={celeb.image} alt={celeb.name} className="object-cover brightness-80 aspect-square object-top" />
              </div>
            ))}
          </RowDiv>
        )))
      ) : (
        [...Array(7)].map((_, i) => (
          <div key={i} className="no-drag border-4 sm:border-6 bg-[var(--dark-accent)] border-[var(--dark-accent)] opacity-25 aspect-square"></div>
        ))
      )}
    </div>
  );
};