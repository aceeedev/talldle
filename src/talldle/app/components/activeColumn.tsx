'use client';
import { Sortable, Store, ReactSortable } from "react-sortablejs";
import { Guess, GuessColor } from "./../useGameState"
import { RowDiv } from "./rowDiv";

function addTooltips() {
  const elements = document.getElementsByClassName("tooltip")
  setTimeout(() => {
    if (elements) {
      for (const el of elements) {
        el.classList.add("tooltip-active");
      }
    }
  }, 150)
}

function removeTooltips() {
  const elements = document.getElementsByClassName("tooltip")
  if (elements) {
    for (const el of elements) {
      el.classList.remove("tooltip-active");
    }
  }
}

export function ActiveColumn({ order, setCurrentGuess }: { order: Array<Guess>, setCurrentGuess: (newState: Guess[], sortable: Sortable | null, store: Store) => void }) {  
  return (
    <ReactSortable
      animation={100}
      // chosenClass="dragging"
      filter=".no-drag"
      list={order}
      setList={setCurrentGuess}
      onChoose={removeTooltips}
      onUnchoose={addTooltips}
      onMove={(e) => e.related.classList.contains('no-drag') ? false : true}
      className="grid grid-rows-7 gap-0.5 sm:gap-1"
    >
      {order?.length > 0 ? (
        order.map((item) => ( item.color == GuessColor.Gray || item.color == GuessColor.Green ? (
          <div key={item.id} className={`${item.color == GuessColor.Green ? 'no-drag border-green-400' : 'border-neutral-600'} row-span-1 tooltip-container border-4 sm:border-6 overflow-clip hover:cursor-pointer column-glow`}>
            <img src={item.celebs[0].imgUrl} alt={item.celebs[0].name} className="object-cover" />
            <aside className="tooltip-active tooltip">{item.celebs[0].name}</aside>
          </div>
        ) : (
          <RowDiv rows={item.celebs.length} key={item.id}>
            {item.celebs.map((celeb) => (
              <div key={celeb.id} className="tooltip-container border-4 sm:border-6 border-yellow-400 ">
                <img src={celeb.imgUrl} alt={celeb.name} className="object-cover" />
                <aside className="tooltip-active tooltip">{celeb.name}</aside>
              </div>
            ))}
          </RowDiv>
        )))
      ) : (
        [...Array(7)].map((_, i) => (
          <div key={i} className="no-drag border-4 sm:border-6 bg-[var(--dark-accent)] border-[var(--dark-accent)] opacity-25 aspect-square"></div>
        ))
      )}
    </ReactSortable>
  );
};