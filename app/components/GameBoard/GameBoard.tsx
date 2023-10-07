'use client'

import { useAppSelector } from '../../redux/hooks'

export default function GameBoard() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)

  if (gameStatus.value !== 'PAGELOAD') {
    return (
      <div>
        <div>
          <button id="green" />
          <button id="red" />
        </div>
        <div>
          <button id="yellow" />
          <button id="blue" />
        </div>
      </div>
    )
  } else return null
}
