'use client'

import { useState, useEffect, useCallback } from "react";
import { Sortable, Store } from "react-sortablejs";
import { logScore, getDailyCelebs } from './firebase'

// Constants:
const dayZero: Date = new Date(2025, 3, 19); // month needs to be off by one? or maybe Im just dumb

export const maxNumGuesses: number = 6;
const numberCelebs: number = 7;
const totalCelebs: number = 3000;


// Interfaces:
export type GameState = {
    dayIndex: number,
    currentGuess: Array<Guess>;
    guesses: Array<Array<Guess>>;
    numGuesses: number;
    isGameOver: boolean;
    trueCelebOrder: Array<Celeb>;
    trueHeightOrder: Array<number>;
    celebAdjacency: DefaultDictType<Array<string>>;
};

export type Celeb = {
    id: string,
    name: string,
    height: number,
    image: string,
    category: string,
    source: string
};

export type Guess = {
    id: number,
    celebs: Array<Celeb>,
    color: GuessColor,
    chosen: false // React Sortable parameter
};

export enum GuessColor {
    Gray,
    Yellow,
    Green
};

type DefaultDictType<T> = {
    get(key: string): T;
    dict: Record<string, T>;
  };


type UseGameStateReturn = {
    gameState: GameState;
    submitGuess: () => void;
    setCurrentGuess: (newState: Guess[], sortable: Sortable | null, store: Store) => void;
    getShareResults: () => string;
};


// Helper Functions:
function defaultDict<T>(factory: () => T): DefaultDictType<T> {
    const dict: Record<string, T> = {};
    return {
      get(key: string): T {
        if (!(key in dict)) {
          dict[key] = factory();
        }
        return dict[key];
      },
      dict
    };
  }


// The Actual Game's Hook:
export function useGameState(): UseGameStateReturn {
    const [gameState, setGameState] = useState<GameState>(() => {
        return {
            dayIndex: -1,
            currentGuess: [],
            guesses: [],
            numGuesses: 0,
            isGameOver: false,
            trueCelebOrder: [],
            trueHeightOrder: [],
            celebAdjacency: defaultDict(() => [] as string[]),
        };
    });

    const submitGuess = useCallback(() => {
        if (gameState.isGameOver || gameState.currentGuess.length === 0) return;

        const guessToAdd: Array<Guess> = []; // the new list of colored/grouped guesses to add to the gameState.guesses
        let guessId = 0; // for giving each guess a unique ID
        let numCorrect = 0; // to check if the user has won
        
        const guessCelebsFlattened: Array<Celeb> = gameState.currentGuess.flatMap(guess => guess.celebs);
        let i = 0;
        let alreadyPushed = false;
        while (i < guessCelebsFlattened.length) {
            let currentCeleb = guessCelebsFlattened[i];

            // if celeb is in the correct place -> green guess
            if (gameState.trueHeightOrder[i] === currentCeleb.height) {
                guessToAdd.push({
                    id: guessId++,
                    celebs: [currentCeleb],
                    color: GuessColor.Green,
                    chosen: false
                });

                numCorrect++;
            } else {
                const celebsToAddToGuess: Array<Celeb> = [currentCeleb];

                for (let j = i + 1; j < guessCelebsFlattened.length; j++) {
                    const celebToCheck = guessCelebsFlattened[j];

                    // if celeb is adjacent and we are not at the end of the list
                    if (gameState.celebAdjacency.get(currentCeleb.id).includes(celebToCheck.id)) {

                        // first check if this celeb is actually just in the correct place
                        if (gameState.trueHeightOrder[j] === celebToCheck.height) {
                            guessToAdd.push({
                                id: guessId++,
                                celebs: celebsToAddToGuess,
                                color: celebsToAddToGuess.length == 1 ? GuessColor.Gray : GuessColor.Yellow,
                                chosen: false
                            });

                            alreadyPushed = true;

                            guessToAdd.push({
                                id: guessId++,
                                celebs: [celebToCheck],
                                color: GuessColor.Green,
                                chosen: false
                            });

                            numCorrect++;

                            // move up i to j
                            i = j;

                            break;
                        }

                        celebsToAddToGuess.push(celebToCheck);

                        // edge case (prevents if yellow at the bottom duplicating)
                        if (j >= guessCelebsFlattened.length - 1) {
                            i = j;
                        }

                        currentCeleb = celebToCheck
                    } else {
                        // move up i to j
                        i = j - 1;

                        break;
                    }
                }

                if (!alreadyPushed) {
                    guessToAdd.push({
                        id: guessId++,
                        celebs: celebsToAddToGuess,
                        color: celebsToAddToGuess.length == 1 ? GuessColor.Gray : GuessColor.Yellow,
                        chosen: false
                    });
                } else {
                    alreadyPushed = false;
                }
            } 

            i++;
        }

        // see if game should end
        if (numCorrect == numberCelebs || gameState.numGuesses + 1 >= maxNumGuesses) {
            setGameState((prev) => ({
                ...prev,
                isGameOver: true,
            }));

            logScore(gameState.guesses)
        }

        setGameState(prev => ({
            ...prev,
            currentGuess: guessToAdd,
            guesses: [...prev.guesses, guessToAdd],
            numGuesses: prev.numGuesses + 1
        }));

    }, [gameState]);

    const setCurrentGuess = useCallback((newState: Guess[]) => {
        setGameState(prev => ({
            ...prev,
            currentGuess: newState,
        }));
    }, []);

    // run on mount
    useEffect(() => {
        const fetchCelebs = async () => {
            try {
                // find date index
                const diffTime = Math.abs((new Date()).getTime() - dayZero.getTime());
                const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

                const dayIndex = diffDays;

                const celebs = await getDailyCelebs(dayIndex % totalCelebs);

                // make the initial celebs order alphabetical
                celebs.sort((a, b) => a.name.localeCompare(b.name));

                // create initial guess order from select celebs
                const startingOrder: Array<Guess> = celebs.map((celeb, index) => ({
                    id: index,
                    celebs: [celeb],
                    color: GuessColor.Gray,
                    chosen: false
                }));

                // find true height order (for checking guesses), note that order is descending
                const trueCelebOrder: Array<Celeb> = celebs.sort((a, b) => b.height - a.height );
                const trueHeightOrder: Array<number> = celebs.map((celeb) => celeb.height);

                // find adjacent celebs (for checking guesses)
                const celebAdjacency = defaultDict(() => [] as string[]); // a map from celeb ID (string) to array of adjacent celeb IDs (strings)

                for (let i = 0; i < celebs.length; i++) {
                    const currentCeleb = celebs[i];

                    // check right side
                    for (let j = i + 1; j < celebs.length; j++) {
                        const celebToCheck = celebs[j];

                        // add celeb next to current celeb
                        celebAdjacency.get(currentCeleb.id).push(celebToCheck.id);

                        // stop adding celebrities if the next celeb is not the same height as the current celeb or if the next celeb and next next celeb is not the same height
                        if (currentCeleb.height !== celebToCheck.height && (j + 1 < celebs.length && celebs[j + 1].height !== celebToCheck.height)) {
                            break;
                        }
                    }
                }
                
                setGameState(prev => ({
                    ...prev,
                    dayIndex: dayIndex,
                    currentGuess: startingOrder,
                    trueCelebOrder: trueCelebOrder,
                    trueHeightOrder: trueHeightOrder,
                    celebAdjacency: celebAdjacency,
                }));
            } catch (err) {
                console.error("Failed to fetch celebs:", err);
            }
        };

        fetchCelebs();

    }, []);

    const getShareResults = useCallback(() => {
        let result = '';
        if (gameState.isGameOver) {
            const guessStrings = new Array<string>(7).fill('')
            gameState.guesses.forEach((guess) => {
                let i = 0;
                guess.forEach((row) => {
                    row.celebs.forEach(() => {
                        if (row.color == GuessColor.Gray) { guessStrings[i] = guessStrings[i] + '⬛' }
                        if (row.color == GuessColor.Green) { guessStrings[i] = guessStrings[i] + '🟩' }
                        if (row.color == GuessColor.Yellow) { guessStrings[i] = guessStrings[i] + '🟨' }
                        i = i + 1
                    })
                })
            })
            result += `Talldle #${gameState.dayIndex} (${gameState.guesses.at(-1)?.every((guess) => guess.color === GuessColor.Green) ? gameState.guesses.length : 'X'}/${maxNumGuesses})`
            guessStrings.forEach((guessString) => {
                result += '\n' + guessString
            })
        }
        result += '\n\nSort famous people by height!\nPlay Talldle at https://www.talldle.com'
        return result
    }, [gameState])

    return { gameState, submitGuess, setCurrentGuess, getShareResults };
}
