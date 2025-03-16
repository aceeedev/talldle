'use client'

import { useState, useEffect, useCallback } from "react";

// Interfaces:
type GameState = {
    trueOrder: Array<Celeb>;
    guesses: Array<Array<Celeb>>;
    numGuesses: number;
    isGameOver: boolean;
};

type Celeb = {
    id: string,
    name: string,
    height: number,
    imgUrl: string,
};

type UseGameStateReturn = {
    gameState: GameState;
    guessOrder: (guess: Array<Celeb>) => void;
};


export function useGameState(): UseGameStateReturn {
    const maxNumGuesses: number = 5;
    const numberCelebs: number = 7;

    const [gameState, setGameState] = useState<GameState>(() => {
        // initialize game

        return {
            trueOrder: [],
            guesses: [],
            numGuesses: 0,
            isGameOver: false,
        };
    });

    const guessOrder = useCallback((guess: Array<Celeb>) => {
        
        setGameState((prev) => ({
            ...prev, 
            guesses: [...prev.guesses, guess],
            numGuesses: prev.numGuesses + 1,
        }));
    }, []);

    useEffect(() => {
        if (gameState.numGuesses >= maxNumGuesses) {
            setGameState((prev) => ({ ...prev, isGameOver: true }));
        }
    }, []);

    return { gameState, guessOrder };
}
