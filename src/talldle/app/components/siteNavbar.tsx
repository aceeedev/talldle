import { useState } from "react";
import { MenuIcon, InfoIcon, NetworkIcon } from './icons';
import { showHowToPlayCard } from "./howToPlayCard"

export function SiteNavbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section>
      <div className="flex justify-between items-center py-1 sm:py-2 px-[2vw] sm:px-[20vw] border-b-2 border-b-[var(--dark-accent)]">
        <div className="flex-1 text-left">
          <div className="flex gap-1 sm:gap-2">
            <div className="relative my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)]" onClick={() => {setIsMenuOpen(!isMenuOpen)}} onMouseLeave={() => setIsMenuOpen(false)}>
              <MenuIcon />
              {isMenuOpen && (
                <div className="absolute w-48 bg-black border-2 border-[var(--dark-accent)] rounded-md shadow-lg z-1">
                  <ul className="py-1 text-gray-100">
                    <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">Share</li>
                    <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">Disclaimer</li>
                    <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer" onClick={showHowToPlayCard}>How To Play</li>
                    <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">Credits</li>
                  </ul>
                </div>
              )}
            </div>
            <div onClick={showHowToPlayCard} className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)]"><InfoIcon /></div>
            <div className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)]"><NetworkIcon /></div>
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