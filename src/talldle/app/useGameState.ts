'use client'

import { useState, useEffect, useCallback } from "react";
import Papa, { ParseResult } from "papaparse"
import { Sortable, Store } from "react-sortablejs";

// Constants:
const dayZero: Date = new Date(2025, 2, 16); // month needs to be off by one? or maybe Im just dumb

export const maxNumGuesses: number = 6;
const numberCelebs: number = 7;


// Interfaces:
type GameState = {
    dayIndex: number,
    currentGuess: Array<Guess>;
    guesses: Array<Array<Guess>>;
    numGuesses: number;
    isGameOver: boolean;
    trueHeightOrder: Array<number>;
    celebAdjacency: DefaultDictType<Array<string>>
};

export type Celeb = {
    id: string,
    name: string,
    height: number,
    imgUrl: string,
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
    setCurrentGuess: (newState: Guess[], sortable: Sortable | null, store: Store) => void
};


// Helper Functions:
function seededRandom(seed: number): () => number {
    return function () {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

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

function getRandomElements<T>(arr: T[], count: number, seed: number): T[] {
    const random = seededRandom(seed);
    const result: T[] = [];
    const available = [...arr];

    for (let i = 0; i < count && available.length > 0; i++) {
        const index = Math.floor(random() * available.length);
        result.push(available[index]);
        available.splice(index, 1);
    }

    return result;
}


// The Actual Game's Hook:
export function useGameState(): UseGameStateReturn {
    const [gameState, setGameState] = useState<GameState>(() => {
        return {
            dayIndex: 0,
            currentGuess: [],
            guesses: [],
            numGuesses: 0,
            isGameOver: false,
            trueHeightOrder: [],
            celebAdjacency: defaultDict(() => [] as string[]),
        };
    });

    const submitGuess = useCallback(() => {
        if (gameState.isGameOver) return;

        const guessToAdd: Array<Guess> = []; // the new list of colored/grouped guesses to add to the gameState.guesses
        let guessId = 0; // for giving each guess a unique ID
        let numCorrect = 0; // to check if the user has won
        
        const guessCelebsFlattened: Array<Celeb> = gameState.currentGuess.flatMap(guess => guess.celebs);
        let i = 0;
        while (i < guessCelebsFlattened.length) {
            const currentCeleb = guessCelebsFlattened[i];

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
                    if (gameState.celebAdjacency.get(currentCeleb.id).includes(celebToCheck.id) && j != guessCelebsFlattened.length -1) {

                        // first check if this celeb is actually just in the correct place
                        if (gameState.trueHeightOrder[j] === celebToCheck.height) {
                            guessToAdd.push({
                                id: guessId++,
                                celebs: [celebToCheck],
                                color: GuessColor.Green,
                                chosen: false
                            });

                            numCorrect++;

                            // move up i to j
                            i = j - 1;

                            break;
                        }
                        
                        celebsToAddToGuess.push(celebToCheck)
                    } else {
                        // move up i to j
                        i = j - 1;

                        break;
                    }
                }

                guessToAdd.push({
                    id: guessId++,
                    celebs: celebsToAddToGuess,
                    color: celebsToAddToGuess.length == 1 ? GuessColor.Gray : GuessColor.Yellow,
                    chosen: false
                });
            } 

            i++;
        }

        // see if game should end
        if (numCorrect == numberCelebs || gameState.numGuesses + 1 >= maxNumGuesses) {
            setGameState((prev) => ({ ...prev, isGameOver: true }));
        }

        setGameState(prev => ({
            ...prev,
            currentGuess: guessToAdd,
            guesses: [...prev.guesses, guessToAdd],
            numGuesses: prev.numGuesses + 1
        }));

    }, [gameState]);

    const setCurrentGuess = useCallback((newState: Guess[], sortable: Sortable | null, store: Store) => {
        setGameState(prev => ({
            ...prev,
            currentGuess: newState,
        }));
    }, []);

    // run on mount
    useEffect(() => {
        const fetchCelebs = async () => {
            try {
                let celebs = await getDailyCelebs();

                // make sure the order by default isnt sorted
                // let i = 0;
                // while (!checkCorrectOrder(celebs)) {
                //     celebs = getRandomElements(celebs, celebs.length, i);

                //     i++;
                // }

                // make the initial celebs order alphabetical
                celebs.sort((a, b) => a.name.localeCompare(b.name));

                // create initial guess order from select celebs
                let startingOrder: Array<Guess> = celebs.map((celeb, index) => ({
                    id: index,
                    celebs: [celeb],
                    color: GuessColor.Gray,
                    chosen: false
                }));

                // find true height order (for checking guesses), note that order is descending
                celebs.sort((a, b) => b.height - a.height );
                let trueHeightOrder: Array<number> = celebs.map((celeb) => celeb.height);

                // find adjacent celebs (for checking guesses)
                const celebAdjacency = defaultDict(() => [] as string[]); // a map from celeb ID (string) to array of adjacent celeb IDs (strings)

                for (let i = 0; i < celebs.length; i++) {
                    const currentCeleb = celebs[i];

                    // // check left side
                    // for (let j = i - 1; i > 0 && j >= 0; j--) {
                    //     const celebToCheck = celebs[j];

                    //     // add celeb next to current celeb
                    //     celebAdjacency.get(currentCeleb.id).push(celebToCheck.id);
                        
                    //     // stop adding celebrities if the next celeb is not the same height as the current celeb or if the next celeb and next next celeb is not the same height
                    //     if (currentCeleb.height !== celebToCheck.height && (j - 1 >= 0 && celebs[j - 1].height !== celebToCheck.height)) {
                    //         break;
                    //     }
                    // }

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
                    currentGuess: startingOrder,
                    trueHeightOrder: trueHeightOrder,
                    celebAdjacency: celebAdjacency,
                }));
            } catch (err) {
                console.error("Failed to fetch celebs:", err);
            }
        };

        fetchCelebs();

    }, []);


    const checkCorrectOrder = (celebsToCheck: Celeb[]): boolean => {
        for (let i = 1; i < celebsToCheck.length; i++) {
            if (celebsToCheck[i - 1] > celebsToCheck[i]) {
                return false;
            }
        }

        return true;
    }

    const getDailyCelebs = async (): Promise<Celeb[]> => {
        // parse csv
        return new Promise((resolve, reject) => {
            Papa.parse<Celeb>('/data.csv', {
                header: true,
                download: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                delimiter: ",",
                complete: (results: ParseResult<Celeb>) => {
                    // now that we have all the data in the csv, pick today's selection

                    // find date index
                    const diffTime = Math.abs((new Date()).getTime() - dayZero.getTime());
                    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

                    const dayIndex = diffDays;
                    const selectedCelebs = getRandomElements(results.data, numberCelebs, dayIndex);

                    setGameState(prev => ({
                        ...prev,
                        dayIndex: dayIndex,
                    }));
                
                    resolve(selectedCelebs);                    
                },
                error: (error) => reject(error),
            })
        })
    };

    return { gameState, submitGuess, setCurrentGuess };
}
