import { EmptyColumn } from './components/emptyColumn';
import { SiteNavbar } from './components/siteNavbar';
import { SortableTest } from './components/sortableTest';

export default function Home() {
  return (
    <div>
      <SiteNavbar />

      <br />

      <section className="grid justify-center">
        <div className="flex-1 text-right text-lg sm:text-2xl font-bold">
          Daily #42
        </div>
      </section>

      <br />

      <section>
        <div className="grid grid-cols-6 justify-center m-auto gap-0.5 sm:gap-1 w-[96vw] max-w-xl">
          <SortableTest />
          <EmptyColumn />
          <EmptyColumn />
          <EmptyColumn />
          <EmptyColumn />
          <EmptyColumn />
        </div>
      </section>

      <br />

      <section>
        <div className="grid justify-center">
          <span className="mg-auto font-bold px-6 sm:px-10 py-1 sm:py-2 text-lg sm:text-2xl bg-[var(--talldle-red)] text-[var(--background)] glow hover:cursor-pointer">
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