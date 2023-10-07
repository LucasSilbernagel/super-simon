'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './GameBoard.css'

export default function GameBoard() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)

  const dispatch = useAppDispatch()

  const areWedgesDisabled = gameStatus.value === 'UNSTARTED'

  if (gameStatus.value !== 'PAGELOAD') {
    return (
      <div className="GameBoard">
        <button
          id="green"
          disabled={areWedgesDisabled}
          className="GameBoard__wedge bg-green-500 top-0 left-0"
        />
        <button
          id="red"
          disabled={areWedgesDisabled}
          className="GameBoard__wedge bg-red-500 top-0 right-0"
        />
        <button
          id="yellow"
          disabled={areWedgesDisabled}
          className="GameBoard__wedge bg-yellow-500 bottom-0 left-0"
        />
        <button
          id="blue"
          disabled={areWedgesDisabled}
          className="GameBoard__wedge bg-blue-500 bottom-0 right-0"
        />
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
