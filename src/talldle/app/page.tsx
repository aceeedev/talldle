import { EmptyColumn } from './components/emptyColumn';
import { SiteNavbar } from './components/siteNavbar';
import { SortableTest } from './components/sortableTest';

export default function Home() {
  return (
    <main>
      <section className="flex flex-col grow h-[100svh]">
        <section>
          <SiteNavbar />
          <div className="mt-2 sm:mt-4">
            <div className="grid justify-center">
              <div className="flex-1 text-right text-xl sm:text-3xl font-bold">
                Daily #42
              </div>
            </div>
          </div>
        </section>
        <section className="flex-1 flex flex-col justify-center">
          <div className="my-2">
            <div className="grid justify-center"><span className="mg-auto text-xs sm:text-base text-[var(--light-accent)]">Tallest</span></div>
            <div>
              <div className="grid grid-cols-6 justify-center m-auto gap-0.5 sm:gap-1 w-[96vw] max-w-xl">
                <SortableTest />
                <EmptyColumn />
                <EmptyColumn />
                <EmptyColumn />
                <EmptyColumn />
                <EmptyColumn />
              </div>
            </div>
            <div className="grid justify-center"><span className="mg-auto text-xs sm:text-base text-[var(--light-accent)]">Shortest</span></div>
          </div>
        </section>
        <section className="grid justify-center mb-[8vh] sm:mb-[5vh]">
          <span className="mg-auto font-bold px-8 sm:px-12  py-2 sm:py-3 text-xl sm:text-2xl bg-[var(--talldle-red)] text-[var(--background)] glow hover:cursor-pointer">
            Enter Guess
          </span>
        </section>
      </section>
    </main>
  )
}