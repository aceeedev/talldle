import Image from "next/image";
import { MockGrid } from './components/mockGrid';
import { SiteNavbar } from './components/siteNavbar';

export default function Home() {
  return (
    <div>
      <SiteNavbar />

      <br />

      <section className="grid justify-center">
        <div className="m-auto title text-4xl sm:text-5xl lg:text-6xl glow">
          <span>Tall</span><span className="text-border">dle</span>
        </div>
{/* 
        <div className="m-auto glow">
          <p className="text-sm lg:text-lg text-center">Sort the famous people from shortest to tallest!</p>
        </div> */}

        {/* <div className="flex justify-center gap-10">
          <svg width="48px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="2.67" stroke-linecap="round" />
            <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="2.67" stroke-linecap="round" />
            <line x1="4" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="2.67" stroke-linecap="round" />
          </svg>
          <svg width="42px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
          </svg>
          <svg width="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="5" r="3" fill="currentColor" />
            <circle cx="6" cy="12" r="3" fill="currentColor" />
            <circle cx="18" cy="19" r="3" fill="currentColor" />
            <line x1="8.5" y1="12.5" x2="15.5" y2="6.5" stroke="currentColor" strokeWidth="2" stroke-linecap="round" />
            <line x1="8.5" y1="12.5" x2="15.5" y2="18.5" stroke="currentColor" strokeWidth="2" stroke-linecap="round" />
          </svg>
        </div> */}
        
        {/* <br />

        <div className="m-auto text-lg glow">
          <span className="text-3xl">Daily #42</span>
        </div> */}
      </section>


      <br />


      <section>
        <div className="grid justify-center">
          <MockGrid />
        </div>
      </section>


      <br />


      <section>
        <div className="grid justify-center">
          <span className="mg-auto font-bold px-8 sm:px-10 py-1 sm:py-2 border-2 border-talldle-red text-lg sm:text-2xl hover:bg-[var(--talldle-red)] hover:text-[var(--background)] hover:border-[var(--talldle-red)] hover:cursor-pointer duration-50">
            Enter Guess
          </span>
        </div>
      </section>
    </div>
  )
}