'use client';

import { EmptyColumn } from './components/emptyColumn';
import { SiteNavbar } from './components/siteNavbar';
import { ActiveColumn } from './components/activeColumn';
import { HistoryColumn } from './components/historyColumn';
import { useGameState, maxNumGuesses } from "./useGameState"
import { HowToPlayCard } from './components/howToPlayCard';
import { EndGameCard, showEndGameCard} from './components/endGameCard';
import { CreditsCard } from './components/creditsCard';
import { CopyAnnouncement } from './components/copyAnnouncement'

export default function Home() {
  const { gameState, submitGuess, setCurrentGuess, getShareResults } = useGameState();

  return (
    <main>
      <CopyAnnouncement />
      <section className="flex flex-col grow min-h-[100svh]">
        <section>
          <SiteNavbar gameState={gameState} getShareResults={getShareResults}/>
          <div className="mt-2 sm:mt-4">
            <div className="grid justify-center">
              <div className="flex-1 text-right text-xl sm:text-3xl font-bold">
                {gameState.dayIndex === -1 ? (
                  <span className="invisible">(Loading)</span>
                ) : (
                  `Daily #${gameState.dayIndex}`
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="flex-1 flex flex-col justify-center">
          <div className="my-2">
            <div className="grid justify-center"><span className="mg-auto text-xs sm:text-base text-[var(--light-accent)]">Tallest</span></div>
            <div>
              <div className="grid grid-cols-6 justify-center m-auto gap-1 sm:gap-2 w-[98vw] max-w-xl">
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
        <section className="grid justify-center mb-[5vh]">
          <span tabIndex={0} onClick={() => !gameState.isGameOver ? submitGuess() : showEndGameCard()} onKeyDown={(e) => (e.key === "Enter") && (!gameState.isGameOver ? submitGuess() : showEndGameCard())} className="mg-auto font-bold px-8 sm:px-12 py-2 sm:py-3 text-xl sm:text-2xl bg-[var(--talldle-red)] text-[var(--background)] hover:cursor-pointer focus:bg-red-500 hover:bg-red-500">
            Enter Guess
          </span>
        </section>
      </section>

      {/* invisible cards until active */} 
      <HowToPlayCard />
      {gameState.isGameOver &&
        <EndGameCard gameState={gameState} getShareResults={getShareResults} />
      }
      <CreditsCard />

    </main>
  )
}