'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './GameBoard.css'
import { useEffect, useState } from 'react'
import * as Tone from 'tone'
import { getRandomInteger } from '@/app/utils/getRandomInteger'

export default function GameBoard() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)

  const dispatch = useAppDispatch()

  // create a synth and connect it to the main output (speakers)
  let synth: Tone.Synth<Tone.SynthOptions>
  if (typeof window !== 'undefined') {
    synth = new Tone.Synth().toDestination()
  }

  const [lastClickedWedge, setLastClickedWedge] = useState<string>('')
  const [botSequence, setBotSequence] = useState<string[]>([])
  const [playerSequence, setPlayerSequence] = useState<string[]>([])
  const [botClick, setBotClick] = useState<string>('')
  const [playerScore, setPlayerScore] = useState(0)
  const [isPlayingBotSequence, setIsPlayingBotSequence] = useState(false)

  const areWedgesDisabled =
    gameStatus.value === 'UNSTARTED' || isPlayingBotSequence

  const wedges = [
    'bg-green-500 top-0 left-0',
    'bg-red-500 top-0 right-0',
    'bg-yellow-500 bottom-0 left-0',
    'bg-blue-500 bottom-0 right-0',
  ]

  const tones = { '0': 'F3', '1': 'D3', '2': 'B3', '3': 'G3' }

  const handleWedgeClick = (id: string) => {
    setLastClickedWedge(id)
    synth.triggerAttackRelease(tones[id as keyof typeof tones], '16n')
    const newPlayerSequence = [...playerSequence]
    newPlayerSequence.push(id)
    setPlayerSequence(newPlayerSequence)
  }

  useEffect(() => {
    if (lastClickedWedge.length > 0) {
      setTimeout(() => {
        setLastClickedWedge('')
      }, 200)
    }
  }, [lastClickedWedge, setLastClickedWedge])

  const playBotSequence = async () => {
    for (const item of botSequence) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setBotClick(item)
          synth.triggerAttackRelease(tones[item as keyof typeof tones], '16n')
          resolve(undefined)
          setTimeout(() => setBotClick(''), 500)
        }, 800)
      })
    }
    setTimeout(() => {
      setBotClick('')
    }, 800)
  }

  useEffect(() => {
    if (gameStatus.value === 'STARTED') {
      if (botSequence.length === 0) {
        setPlayerSequence([])
        setBotSequence([String(getRandomInteger())])
      }
    }
  }, [gameStatus.value, botSequence])

  useEffect(() => {
    if (gameStatus.value === 'STARTED') {
      if (botSequence.length > playerScore) {
        setIsPlayingBotSequence(true)
        playBotSequence()
          .then(() => setIsPlayingBotSequence(false))
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }, [gameStatus.value, botSequence, playerScore])

  useEffect(() => {
    if (gameStatus.value === 'STARTED') {
      if (
        botSequence.length > 0 &&
        (botSequence.length === playerScore ||
          botSequence.length === playerSequence.length)
      ) {
        setPlayerSequence([])
        const newBotSequence = [...botSequence]
        newBotSequence.push(String(getRandomInteger()))
        setBotSequence(newBotSequence)
      }
    }
  }, [gameStatus.value, botSequence, playerScore, playerSequence])

  useEffect(() => {
    if (gameStatus.value === 'STARTED') {
      if (
        botSequence.length > 0 &&
        botSequence.length === playerSequence.length &&
        botSequence.every((item, index) => playerSequence[index] === item)
      ) {
        setPlayerScore(playerScore + 1)
        setPlayerSequence([])
      }
      if (
        botSequence.length > 0 &&
        playerSequence.length > 0 &&
        !playerSequence.every((item, index) => botSequence[index] === item)
      ) {
        dispatch(updateGameStatus({ value: 'FINISHED' }))
        alert(`Game over! Score: ${playerScore}`)
      }
    }
  }, [gameStatus.value, botSequence, playerScore, playerSequence])

  if (gameStatus.value !== 'PAGELOAD' && gameStatus.value !== 'FINISHED') {
    return (
      <div className="GameBoard">
        {wedges.map((wedge, index) => {
          return (
            <button
              key={wedge.replaceAll(' ', '-')}
              id={`${index}`}
              disabled={areWedgesDisabled}
              className={`GameBoard__wedge ${wedge} ${
                lastClickedWedge === String(index) || botClick === String(index)
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
