import { MenuIcon, InfoIcon, NetworkIcon } from './icons';

export function SiteNavbar() {
  return (
    <div className="flex justify-between items-center py-1 sm:py-2 px-[4vw] sm:px-[20vw] border-b-2 border-b-[var(--accent)]">
      
      <div className="flex-1 text-left">
        <div className="flex gap-1 sm:gap-2">
          <div className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--accent)] "><MenuIcon /></div>
          <div className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--accent)]"><InfoIcon /></div>
          <div className="my-auto w-[40px] sm:w-[48px] rounded-full p-2 hover:cursor-pointer hover:bg-[var(--accent)]"><NetworkIcon /></div>
        </div>
      </div>

      <div className="flex-2 text-center hidden lg:block">
        Sort famous people from shortest to tallest!
      </div>

      <div className="flex-1 text-right title text-3xl sm:text-4xl glow">
        <a href="."><span>Tall</span><span className="text-border">dle</span></a>
      </div>
    </div>
  );
}