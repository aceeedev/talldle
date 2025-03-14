export function SiteNavbar() {
  return (
    <div className="flex justify-between items-center p-2 sm:p-4 px-[4vw] sm:px-[20vw] shadow">
      
      <div className="flex-1 text-left">
        <div className="flex gap-4 sm:gap-5">
          <svg className="w-[32px] sm:w-[36px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="2.67" stroke-linecap="round" />
            <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="2.67" stroke-linecap="round" />
            <line x1="4" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="2.67" stroke-linecap="round" />
          </svg>
          <svg className="w-[24px] sm:w-[28px]" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
          </svg>
          <svg className="w-[28px] sm:w-[32px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="5" r="3" fill="currentColor" />
            <circle cx="6" cy="12" r="3" fill="currentColor" />
            <circle cx="18" cy="19" r="3" fill="currentColor" />
            <line x1="8.5" y1="12.5" x2="15.5" y2="6.5" stroke="currentColor" strokeWidth="2" stroke-linecap="round" />
            <line x1="8.5" y1="12.5" x2="15.5" y2="18.5" stroke="currentColor" strokeWidth="2" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      <div className="flex-2 text-center hidden lg:block">
        Sort famous people from shortest to tallest!
      </div>

      <div className="flex-1 text-right text-lg sm:text-2xl font-bold">
        Daily #42
      </div>
    </div>
  );
}