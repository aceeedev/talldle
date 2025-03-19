'use client';
import { Sortable, Store, ReactSortable } from "react-sortablejs";
import { Guess, GuessColor } from "./../useGameState"

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
      className="grid grid-rows-7 gap-0.5 sm:gap-1"
    >
      {order?.length > 0 ? (
        order.map((item) => ( item.color == GuessColor.Gray || item.color == GuessColor.Green ? (
          <div key={item.id} className={`${item.color == GuessColor.Green ? 'no-drag border-green-500' : 'border-[var(--dark-accent)]'} tooltip-container border-2 sm:border-4 overflow-clip aspect-square hover:cursor-pointer`}>
            <img src={item.celebs[0].imgUrl} alt={item.celebs[0].name} className="object-cover" />
            <aside className="tooltip-active tooltip">{item.celebs[0].name}</aside>
          </div>
        ) : (
          <div key={item.id} className={`rows-span${item.celebs.length} flex flex-col gap-0.5 sm:gap-1 tooltip-container border-2 sm:border-4 border-yellow-300 bg-black overflow-clip hover:cursor-pointer`}>
            {item.celebs.map((celeb) => (
              <div className="aspect-square">
                <img src={celeb.imgUrl} alt={celeb.name} className="object-cover" />
                <aside className="tooltip-active tooltip">{celeb.name}</aside>
              </div>
            ))}
          </div>
        )))
      ) : (
        [...Array(7)].map((_, i) => (
          <div key={i} className="no-drag border-2 sm:border-4 bg-[var(--dark-accent)] border-[var(--dark-accent)] opacity-35 aspect-square"></div>
        ))
      )}
    </ReactSortable>
  );
};