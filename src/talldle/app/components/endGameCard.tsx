import { GameState, GuessColor, maxNumGuesses } from '../useGameState'
import { showCopyAnnouncement } from './copyAnnouncement'
import { logShare } from '../firebase'

export function hideEndGameCard() {
  document.getElementById("end-game-info")?.classList.remove("visible")
  document.getElementById("end-game-info")?.classList.add("invisible")
}

export function showEndGameCard() {
  document.getElementById("end-game-info")?.classList.remove("invisible")
  document.getElementById("end-game-info")?.classList.add("visible")
}

export function EndGameCard({ gameState, getShareResults } : { gameState: GameState, getShareResults: () => string }) {

  const shareOnClick = function() {
    navigator.clipboard?.writeText(getShareResults());
    showCopyAnnouncement();
    logShare(gameState.isGameOver);
  };

  return (
    <div onClick={hideEndGameCard} id="end-game-info" className="visible fixed top-0 pt-14 sm:pt-0 sm:flex w-screen h-screen bg-[#00000050] hover:cursor-pointer z-1">
      <div onClick={(e) => e.stopPropagation()} className="relative m-auto bg-black p-8 sm:p-12 text-gray-100 max-w-2xl hover:cursor-default">
        <div tabIndex={0} onClick={hideEndGameCard} onKeyDown={(e) => (e.key === "Enter") && (hideEndGameCard())} className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 sm:w-14 rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)] focus:bg-[var(--dark-accent)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </div>

        <div className="text-neutral-200">
          {gameState.guesses.at(-1)?.every((guess) => guess.color === GuessColor.Green) ? (
            <div className="flex justify-center flex-col">
              <h1 className="text-2xl sm:text-4xl font-bold m-auto">🎉 Congrats!! 🎉</h1>
              <span className="m-auto text-lg sm:text-xl">{`${gameState.guesses.length}/${maxNumGuesses} guesses`}</span>
            </div>
          ) : (
            <div className="flex justify-center flex-col">
              <h1 className="text-2xl sm:text-4xl font-bold m-auto">👏 Game Over. 👏</h1>
              <span className="m-auto text-lg sm:text-xl">{`X/${maxNumGuesses} guesses`}</span>
            </div>
          )}
          <hr className="border-1 my-6" />
          {gameState.trueCelebOrder.map((celeb) => (
            <div key={celeb.id} className="grid grid-cols-[2fr_auto_1fr] gap-2 sm:gap-8 text-sm sm:text-xl items-center my-0.5 sm:my-1">
              <div className="flex gap-2 items-center"><img src={celeb.imgUrl} className="w-8 h-8 sm:w-12 sm:h-12 object-cover"/><span>{celeb.name}</span></div>
              <span>:</span>
              <span>{Math.round(celeb.height*3.2808) / 100}ft ({celeb.height}cm)</span>
            </div>
          ))}
          <hr className="border-1 my-6" />
          <div className="flex justify-center">
            <span tabIndex={0} onClick={shareOnClick} onKeyDown={(e) => (e.key === "Enter") && (shareOnClick())} className="text-lg sm:text-xl font-bold py-2 px-4 border-2 text-[var(--talldle-red)] hover:cursor-pointer hover:bg-[var(--talldle-red)] hover:text-black hover:border-[var(--talldle-red)] focus:bg-[var(--talldle-red)] focus:text-black focus:border-[var(--talldle-red)]">Share Results</span>
          </div>
        </div>
      </div>
    </div>
  );
}