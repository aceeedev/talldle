import { maxNumGuesses } from "../useGameState"

export function hideHowToPlayCard() {
  document.getElementById("how-to-play")?.classList.remove("visible")
  document.getElementById("how-to-play")?.classList.add("invisible")
}

export function showHowToPlayCard() {
  document.getElementById("how-to-play")?.classList.remove("invisible")
  document.getElementById("how-to-play")?.classList.add("visible")
}

export function HowToPlayCard() {
  return (
    <div onClick={hideHowToPlayCard} id="how-to-play" className="invisible fixed top-0 pt-14 sm:pt-0 sm:flex w-screen h-screen bg-[#00000050] hover:cursor-pointer z-1">
      <div onClick={(e) => e.stopPropagation()} className="relative m-auto bg-black p-8 sm:p-12 text-gray-100 max-w-2xl hover:cursor-default">
        <div onClick={hideHowToPlayCard} className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 sm:w-14 rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold underline">How to Play</h1>
        <h2 className="text-lg">Sort the famous people by height with {maxNumGuesses} attempts.</h2>
        <br />
        <p>Color scheme:</p>
        <ul className="list-disc list-inside">
          <li><span className="text-green-300 underline">Green</span> = correct placement.</li>
          <li><span className="text-yellow-300 underline">Yellow</span> = correct order but incorrect placement.</li>
          <li><span className="text-gray-300 underline">Gray</span> = incorrect order and incorrect placement.</li>
        </ul>
        <br />
        <p>Incorrect guesses will guide you to the correct answer.</p>
        <br />
        <p>Share your results with friends!</p>
        <p>Come back each day for new releases!</p>
      </div>
    </div>
  );
}