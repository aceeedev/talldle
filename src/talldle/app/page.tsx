'use client';

import { EmptyColumn } from './components/emptyColumn';
import { SiteNavbar } from './components/siteNavbar';
import { ActiveColumn } from './components/activeColumn';
import { HistoryColumn } from './components/historyColumn';
import { useGameState, maxNumGuesses } from "./useGameState"
import { HowToPlay } from './components/howToPlay';

export default function Home() {
  const { gameState, submitGuess, setCurrentGuess } = useGameState();

  // console.log(gameState)

  return (
    <main>
      <section className="flex flex-col grow min-h-[100svh]">
        <section>
          <SiteNavbar />
          <div className="mt-2 sm:mt-4">
            <div className="grid justify-center">
              <div className="flex-1 text-right text-xl sm:text-3xl font-bold">
                Daily #{gameState.dayIndex}
              </div>
            </div>
          </div>
        </section>
        <section className="flex-1 flex flex-col justify-center">
          <div className="my-2">
            <div className="grid justify-center"><span className="mg-auto text-xs sm:text-base text-[var(--light-accent)]">Tallest</span></div>
            <div>
              <div className="grid grid-cols-6 justify-center m-auto gap-0.5 sm:gap-1 w-[96vw] max-w-lg">
                {/* display a history for every past guess */}
                {gameState.guesses.map((guess, index) => (
                  <HistoryColumn order={guess} key={index}/>
                ))}

                {/* allow player to guess if they have guesses left*/}
                {!gameState.isGameOver && 
                  <ActiveColumn order={gameState.currentGuess} setCurrentGuess={setCurrentGuess}/>
                }

                {/* for remaining guesses display an empty column */}
                {!gameState.isGameOver && [...Array(maxNumGuesses - gameState.numGuesses - 1).keys()].map(key => 
                  <EmptyColumn key={key}/>
                )
                }
              </div>
            </div>
            <div className="grid justify-center"><span className="mg-auto text-xs sm:text-base text-[var(--light-accent)]">Shortest</span></div>
          </div>
        </section>
        <section className="grid justify-center mb-[8vh]">
          <span onClick={submitGuess} className="mg-auto font-bold px-8 sm:px-12  py-2 sm:py-3 text-xl sm:text-2xl bg-[var(--talldle-red)] text-[var(--background)] glow hover:cursor-pointer hover:scale-[1.05] duration-100">
            Enter Guess
          </span>
        </section>
      </section>
      <HowToPlay />
    </main>
  )
}