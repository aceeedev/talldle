import { useState } from "react";
import { MenuIcon, InfoIcon, NetworkIcon } from './icons';
import { showHowToPlayCard } from "./howToPlayCard";
import { showCreditsCard } from "./creditsCard";
import { showEndGameCard } from "./endGameCard";
import { GameState } from '../useGameState';
import { logShare } from '../firebase';
import { showCopyAnnouncement } from './copyAnnouncement';
import { showDisclaimerCard } from './disclaimerCard';

export function SiteNavbar({gameState, getShareResults}: {gameState: GameState, getShareResults : () => string}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const shareOnClick = function() {
    if (gameState.isGameOver) {
      showEndGameCard();
    } else {
      navigator.clipboard?.writeText(getShareResults());
      showCopyAnnouncement();
    }
    logShare(gameState.isGameOver);
  };

  return (
    <section>
      <div className="flex justify-between items-center py-1 sm:py-2 px-[2vw] sm:px-[20vw] border-b-2 border-b-[var(--dark-accent)]">
        <div className="flex-1 text-left">
          <div className="flex gap-1 sm:gap-2">
            <div tabIndex={0} className="relative my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)] focus:bg-[var(--dark-accent)] " onClick={() => {setIsMenuOpen(!isMenuOpen)}} onMouseLeave={() => setIsMenuOpen(false)} onKeyDown={(e) => (e.key === "Enter") && (setIsMenuOpen(!isMenuOpen))}>
              <MenuIcon />
              {isMenuOpen && (
                <div className="absolute w-48 bg-black border-2 border-[var(--dark-accent)] rounded-md shadow-lg z-1">
                  <ul className="py-1 text-gray-100">
                    <li tabIndex={0} className="px-4 py-2 hover:bg-neutral-800 cursor-pointer" onClick={shareOnClick} onKeyDown={(e) => (e.key === "Enter") && (shareOnClick())}>Share</li>
                    <li tabIndex={0} className="px-4 py-2 hover:bg-neutral-800 cursor-pointer" onClick={showDisclaimerCard} onKeyDown={(e) => (e.key === "Enter") && (showDisclaimerCard())}>Disclaimer</li>
                    <li tabIndex={0} className="px-4 py-2 hover:bg-neutral-800 cursor-pointer" onClick={showCreditsCard} onKeyDown={(e) => (e.key === "Enter") && (showCreditsCard())}>Credits</li>
                    <li tabIndex={0} className="px-4 py-2 hover:bg-neutral-800 cursor-pointer" onClick={showHowToPlayCard} onKeyDown={(e) => (e.key === "Enter") && (showHowToPlayCard())}>How To Play</li>
                  </ul>
                </div>
              )}
            </div>
            <div tabIndex={0} onClick={showHowToPlayCard} onKeyDown={(e) => (e.key === "Enter") && (showHowToPlayCard())} className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)] focus:bg-[var(--dark-accent)]"><InfoIcon /></div>
            <div tabIndex={0} onClick={shareOnClick} onKeyDown={(e) => (e.key === "Enter") && (shareOnClick())} className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)] focus:bg-[var(--dark-accent)]"><NetworkIcon /></div>
          </div>
        </div>

        <div className="flex-2 text-center hidden xl:block">
          Sort famous people from shortest to tallest!
        </div>

        <div className="flex-1 text-right title text-3xl sm:text-4xl title-glow">
          <a href="."><span>Tall</span><span className="text-border">dle</span></a>
        </div>
      </div>

      
    </section>
  );
}