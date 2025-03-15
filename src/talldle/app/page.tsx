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
          <span className="mg-auto font-bold px-6 sm:px-10 py-1 sm:py-2 text-lg sm:text-2xl bg-[var(--talldle-red)] text-[var(--background)] hover:cursor-pointer">
            Enter Guess
          </span>
          {/* <div className="flex items-center justify-center w-[256px] h-[48px] border-2 border-talldle-red font-bold text-lg sm:text-2xl hover:bg-[var(--talldle-red)] hover:text-[var(--background)] hover:border-[var(--talldle-red)] hover:cursor-pointer hover:text-3xl duration-50">
            Enter Guess
          </div> */}
          {/* <div className="flex items-center justify-center w-[256px] h-[48px] font-bold text-lg sm:text-2xl bg-[var(--talldle-red)] text-[var(--background)] hover:cursor-pointer hover:text-3xl duration-25">
            Enter Guess
          </div> */}
        </div>
      </section>
    </div>
  )
}