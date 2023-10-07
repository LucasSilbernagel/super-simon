'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './GameBoard.css'

export default function GameBoard() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)

  const dispatch = useAppDispatch()

  const areWedgesDisabled = gameStatus.value === 'UNSTARTED'

  const wedges = [
    'bg-green-500 top-0 left-0',
    'bg-red-500 top-0 right-0',
    'bg-yellow-500 bottom-0 left-0',
    'bg-blue-500 bottom-0 right-0',
  ]

  if (gameStatus.value !== 'PAGELOAD') {
    return (
      <div className="GameBoard">
        {wedges.map((wedge, index) => {
          return (
            <button
              key={wedge.replaceAll(' ', '-')}
              id={`${index}`}
              disabled={areWedgesDisabled}
              className={`GameBoard__wedge ${wedge}`}
            />
          )
        })}
        {gameStatus.value === 'UNSTARTED' && (
          <button
            onClick={() => dispatch(updateGameStatus({ value: 'STARTED' }))}
            className="GameBoard__start-button"
          >
            Start
          </button>
        )}
        {gameStatus.value === 'STARTED' && (
          <div className="GameBoard__score">
            <div>100</div>
          </div>
        )}
      </div>
    )
  } else return null
}
