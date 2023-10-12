'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './GameBoard.css'
import { useEffect, useState } from 'react'
import * as Tone from 'tone'
import { getRandomInteger } from '@/app/utils/getRandomInteger'
import { Difficulty } from '../Difficulty/Difficulty'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'

export default function GameBoard() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)
  const selectedDifficulty = useAppSelector((state) => state.difficultyReducer)

  const dispatch = useAppDispatch()

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
    },
  }

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const areWedgesDisabled =
    gameStatus.value === 'UNSTARTED' ||
    isPlayingBotSequence ||
    gameStatus.value === 'FINISHED'

  const wedges = [
    { label: 'green', style: 'bg-green-500 top-0 left-0' },
    { label: 'red', style: 'bg-red-500 top-0 right-0' },
    { label: 'yellow', style: 'bg-yellow-500 bottom-0 left-0' },
    { label: 'blue', style: 'bg-blue-500 bottom-0 right-0' },
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
    Modal.setAppElement('body')
    dispatch(updateGameStatus({ value: 'PAGELOAD' }))
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden'
    }
  }, [isModalOpen])

  useEffect(() => {
    if (lastClickedWedge.length > 0) {
      setTimeout(() => {
        setLastClickedWedge('')
      }, 200)
    }
  }, [lastClickedWedge, setLastClickedWedge])

  const getDifficultySpeed = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 800
      case 'NORMAL':
        return 600
      case 'HARD':
        return 300
      case 'SUPER SIMON':
        return 300
    }
  }

  const playBotSequence = async () => {
    for (const item of botSequence) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setBotClick(item)
          synth.triggerAttackRelease(tones[item as keyof typeof tones], '16n')
          resolve(undefined)
          setTimeout(
            () => setBotClick(''),
            selectedDifficulty.value === 'EASY' ||
              selectedDifficulty.value === 'NORMAL'
              ? 500
              : 200
          )
        }, getDifficultySpeed(selectedDifficulty.value))
      })
    }
    setTimeout(() => {
      setBotClick('')
    }, getDifficultySpeed(selectedDifficulty.value))
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
        setTimeout(() => {
          playBotSequence()
            .then(() => setIsPlayingBotSequence(false))
            .catch((error) => {
              console.error(error)
            })
        }, 500)
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
        setIsModalOpen(true)
      }
    }
  }, [gameStatus.value, botSequence, playerScore, playerSequence])

  const isSuperSimonMode =
    gameStatus.value === 'STARTED' && selectedDifficulty.value === 'SUPER SIMON'

  return (
    <>
      {gameStatus.value !== 'PAGELOAD' && (
        <div
          className={`GameBoard ${
            isSuperSimonMode ? 'GameBoard--rotating' : ''
          }`}
        >
          {wedges.map((wedge, index) => {
            return (
              <button
                key={wedge.style.replaceAll(' ', '-')}
                id={`${index}`}
                disabled={areWedgesDisabled}
                className={`GameBoard__wedge ${wedge.style} ${
                  lastClickedWedge === String(index) ||
                  botClick === String(index)
                    ? 'opacity-100'
                    : 'opacity-75'
                }`}
                onClick={() => handleWedgeClick(String(index))}
                aria-label={wedge.label}
              />
            )
          })}
          {gameStatus.value === 'UNSTARTED' && (
            <button
              onClick={() => {
                setPlayerScore(0)
                setPlayerSequence([])
                setBotSequence([])
                setIsModalOpen(false)
                dispatch(updateGameStatus({ value: 'STARTED' }))
              }}
              className="GameBoard__start-button"
            >
              Start
            </button>
          )}
          {(gameStatus.value === 'STARTED' ||
            gameStatus.value === 'FINISHED') && (
            <div
              className={`GameBoard__score ${
                isSuperSimonMode ? 'GameBoard__score--rotating' : ''
              }`}
            >
              <div>{playerScore}</div>
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          dispatch(updateGameStatus({ value: 'PAGELOAD' }))
          setPlayerScore(0)
          setPlayerSequence([])
          setBotSequence([])
          setIsModalOpen(false)
        }}
        style={modalStyles}
      >
        <div>
          <div className="w-full flex justify-end">
            <button
              aria-label="Close modal"
              onClick={() => {
                dispatch(updateGameStatus({ value: 'PAGELOAD' }))
                setPlayerScore(0)
                setPlayerSequence([])
                setBotSequence([])
                setIsModalOpen(false)
              }}
              className="text-2xl hover:scale-105"
            >
              <FaTimes />
            </button>
          </div>
          <h3 className="text-4xl uppercase font-bold mt-6 text-center">
            Game over!
          </h3>
          <h4 className="text-center text-3xl my-4">Score: {playerScore}</h4>
          <div className="text-center my-2">
            <button
              onClick={() => {
                dispatch(updateGameStatus({ value: 'PAGELOAD' }))
                setPlayerScore(0)
                setPlayerSequence([])
                setBotSequence([])
                setIsModalOpen(false)
              }}
              className="Link"
            >
              Play again?
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
