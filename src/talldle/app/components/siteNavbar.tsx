import { MenuIcon, InfoIcon, NetworkIcon } from './icons';
import { showHowToPlay } from "./howToPlay"

export function SiteNavbar() {
  return (
    <section>
      <div className="flex justify-between items-center py-1 sm:py-2 px-[2vw] sm:px-[20vw] border-b-2 border-b-[var(--dark-accent)]">
        <div className="flex-1 text-left">
          <div className="flex gap-1 sm:gap-2">
            <div className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)] "><MenuIcon /></div>
            <div onClick={showHowToPlay} className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)]"><InfoIcon /></div>
            <div className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)]"><NetworkIcon /></div>
          </div>
        </div>

        <div className="flex-2 text-center hidden xl:block">
          Sort famous people from shortest to tallest!
        </div>

        <div className="flex-1 text-right title text-3xl sm:text-4xl glow">
          <a href="."><span>Tall</span><span className="text-border">dle</span></a>
        </div>
      </div>

      
    </section>
  );
}