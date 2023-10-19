'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { updateDifficulty } from '@/app/redux/features/difficultySlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './Difficulty.css'
import { orbitron } from '@/app/fonts'

export type Difficulty = 'EASY' | 'NORMAL' | 'HARD' | 'SUPER SIMON'

export default function Difficulty() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)
  const dispatch = useAppDispatch()

  const difficulties = ['EASY', 'NORMAL', 'HARD', 'SUPER SIMON']

  const getButtonColour = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-500'
      case 'NORMAL':
        return 'bg-blue-500'
      case 'HARD':
        return 'bg-yellow-500'
      case 'SUPER SIMON':
        return 'bg-red-500'
    }
  }

  if (gameStatus.value === 'PAGELOAD') {
    return (
      <div className="Difficulty">
        <h3 className="text-3xl mb-8">Select a difficulty:</h3>
        <ul>
          {difficulties.map((difficulty) => (
            <li key={difficulty} className="mb-8">
              <button
                onClick={() => {
                  const selectedDifficulty = difficulty as Difficulty
                  dispatch(updateDifficulty({ value: selectedDifficulty }))
                  dispatch(updateGameStatus({ value: 'UNSTARTED' }))
                }}
                className={`Difficulty__button ${getButtonColour(
                  difficulty as Difficulty
                )} ${orbitron.className}`}
              >
                {difficulty}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  } else return null
}
