'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { updateDifficulty } from '@/app/redux/features/difficultySlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export default function Difficulty() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)
  const dispatch = useAppDispatch()

  const difficulties = ['Easy', 'Normal', 'Hard', 'Super Simon']

  if (gameStatus.value === 'PAGELOAD') {
    return (
      <div>
        <h3>Select a difficulty</h3>
        <ul>
          {difficulties.map((difficulty) => (
            <li key={difficulty}>
              <button
                onClick={() => {
                  const selectedDifficulty = difficulty.toUpperCase() as
                    | 'EASY'
                    | 'NORMAL'
                    | 'HARD'
                    | 'SUPER SIMON'
                  dispatch(updateDifficulty({ value: selectedDifficulty }))
                  dispatch(updateGameStatus({ value: 'STARTED' }))
                }}
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
