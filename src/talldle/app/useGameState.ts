'use client'

import { useState, useEffect, useCallback } from "react";
import Papa, { ParseResult } from "papaparse"

// Constants:
const dayZero: Date = new Date(2025, 3, 16);

const maxNumGuesses: number = 5;
const numberCelebs: number = 7;


// Interfaces:
type GameState = {
    currentGuess: Array<Guess>;
    guesses: Array<Array<Guess>>;
    numGuesses: number;
    isGameOver: boolean;
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
    color: GuessColor
};

export enum GuessColor {
    Gray,
    Yellow,
    Green
};

type UseGameStateReturn = {
    gameState: GameState;
    guessOrder: (guess: Array<Celeb>) => void;
};


// Helper Functions:
function seededRandom(seed: number): () => number {
    return function () {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
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
            currentGuess: [],
            guesses: [],
            numGuesses: 0,
            isGameOver: false,
        };
    });

    const guessOrder = useCallback((celebGuess: Array<Celeb>) => {
        let guess: Array<Guess> = [];

        // TODO: iterate over guess (prob change celebGuess to Array<Guess> or even just check gameState.currentGuess) and see what colors should be what
        for (let i = 0; i < celebGuess.length; i++) {

        }

        setGameState((prev) => ({
            ...prev,
            currentGuess: guess,
            guesses: [...prev.guesses, guess],
            numGuesses: prev.numGuesses + 1,
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
                    color: GuessColor.Gray
                }));
                
                setGameState(prev => ({
                    ...prev,
                    currentGuess: startingOrder,
                }));
            } catch (err) {
                console.error("Failed to fetch celebs:", err);
            }
        };

        fetchCelebs();

    }, []);

    // watch guess count changes
    useEffect(() => {
        if (gameState.numGuesses >= maxNumGuesses) {
            setGameState((prev) => ({ ...prev, isGameOver: true }));
        }
    }, [gameState.numGuesses]);


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
                    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

                    const dayIndex = diffDays;
                    const selectedCelebs = getRandomElements(results.data, numberCelebs, dayIndex);
                
                    resolve(selectedCelebs);                    
                },
                error: (error) => reject(error),
            })
        })
    };

    return { gameState, guessOrder };
}
