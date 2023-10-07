'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './GameBoard.css'
import { useEffect, useState } from 'react'

export default function GameBoard() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)

  const dispatch = useAppDispatch()

  const [lastClickedWedge, setLastClickedWedge] = useState<string>('')

  const areWedgesDisabled = gameStatus.value === 'UNSTARTED'

  const wedges = [
    'bg-green-500 top-0 left-0',
    'bg-red-500 top-0 right-0',
    'bg-yellow-500 bottom-0 left-0',
    'bg-blue-500 bottom-0 right-0',
  ]

  const handleWedgeClick = (id: string) => {
    setLastClickedWedge(id)
  }

  useEffect(() => {
    if (lastClickedWedge.length > 0) {
      setTimeout(() => {
        setLastClickedWedge('')
      }, 200)
    }
  }, [lastClickedWedge, setLastClickedWedge])

  if (gameStatus.value !== 'PAGELOAD') {
    return (
      <div className="GameBoard">
        {wedges.map((wedge, index) => {
          return (
            <button
              key={wedge.replaceAll(' ', '-')}
              id={`${index}`}
              disabled={areWedgesDisabled}
              className={`GameBoard__wedge ${wedge} ${
                lastClickedWedge === String(index)
                  ? 'opacity-100'
                  : 'opacity-75'
              }`}
              onClick={() => handleWedgeClick(String(index))}
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
