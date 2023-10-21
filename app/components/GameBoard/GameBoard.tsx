'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './GameBoard.css'
import { FormEvent, useEffect, useState } from 'react'
import * as Tone from 'tone'
import { getRandomInteger } from '@/app/utils/getRandomInteger'
import { Difficulty } from '../Difficulty/Difficulty'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import getCollection from '@/app/firebase/getData'
import removeFromCollection from '@/app/firebase/removeData'
import addToCollection from '@/app/firebase/addData'
import { useRouter } from 'next/navigation'
import { orbitron } from '@/app/fonts'

export default function GameBoard() {
  const { push } = useRouter()
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
  const [categoryScores, setCategoryScores] = useState<
    { id: string; player: string; score: number }[]
  >([])
  const [shouldPostNewRecord, setShouldPostNewRecord] = useState(false)
  const [playerInitials, setPlayerInitials] = useState('')
  const [hasError, setHasError] = useState(false)

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
    const playSequence = async () => {
      try {
        if (gameStatus.value === 'STARTED') {
          if (botSequence.length > playerScore) {
            setIsPlayingBotSequence(true)
            await new Promise((res) => setTimeout(res, 500))
            await playBotSequence()
            setIsPlayingBotSequence(false)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    playSequence()
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

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const data = await getCollection(
          selectedDifficulty.value.toLowerCase().replace(' ', '-')
        )
        setCategoryScores(data.results.sort((a, b) => b.score - a.score))
      } catch (error) {
        setHasError(true)
        console.error(error)
      }
    }
    fetchCollectionData()
  }, [playerScore, selectedDifficulty.value])

  useEffect(() => {
    if (
      (categoryScores.length < 10 && playerScore > 0) ||
      (categoryScores.length >= 10 &&
        categoryScores.some((score) => score.score < playerScore))
    ) {
      setShouldPostNewRecord(true)
    } else {
      setShouldPostNewRecord(false)
    }
  }, [categoryScores, playerScore])

  useEffect(() => {
    const handleScores = async () => {
      if (categoryScores.length > 10) {
        const sortedScores = categoryScores.sort((a, b) => b.score - a.score)
        const lowestScores = sortedScores.slice(10, sortedScores.length)
        for (const score of lowestScores) {
          try {
            const result = await removeFromCollection(
              selectedDifficulty.value.toLowerCase().replace(' ', '-'),
              score.id
            )
            if (result.error) {
              setHasError(true)
              console.error('Error removing the document:', result.error)
            }
          } catch (error) {
            setHasError(true)
            console.error('An error occurred:', error)
          }
        }
      }
    }
    handleScores()
  }, [categoryScores, selectedDifficulty])

  const isSuperSimonMode =
    gameStatus.value === 'STARTED' && selectedDifficulty.value === 'SUPER SIMON'

  const addNewHighScore = async (player: string) => {
    try {
      const result = await addToCollection(
        selectedDifficulty.value.toLowerCase().replace(' ', '-'),
        {
          player: player,
          score: playerScore,
        }
      )
      if (result.error) {
        setHasError(true)
        console.error('Error adding the document:', result.error)
      }
    } catch (error) {
      setHasError(true)
      console.error('An error occurred:', error)
    }
  }

  const handleInputChange = (e: { target: { value: string } }) => {
    const inputText = e.target.value
    const onlyLetters = inputText.replace(/[^A-Za-z]/g, '')
    setPlayerInitials(onlyLetters)
  }

  const handleSubmitScore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (playerInitials.length > 1) {
      addNewHighScore(playerInitials)
      setTimeout(() => {
        setPlayerScore(0)
        setPlayerSequence([])
        setBotSequence([])
        setIsModalOpen(false)
        setPlayerInitials('')
        push('/leaderboard')
        dispatch(updateGameStatus({ value: 'PAGELOAD' }))
      }, 100)
    }
  }

  if (!hasError) {
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
                      : 'opacity-60'
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
            setPlayerInitials('')
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
                  setPlayerInitials('')
                }}
                className="text-2xl hover:scale-105"
              >
                <FaTimes />
              </button>
            </div>
            <h3
              className={`text-4xl uppercase font-bold mt-6 text-center ${orbitron.className}`}
            >
              Game over!
            </h3>
            <h4 className="text-center text-3xl my-4">Score: {playerScore}</h4>
            {!shouldPostNewRecord && (
              <div className="text-center my-2">
                <button
                  onClick={() => {
                    dispatch(updateGameStatus({ value: 'PAGELOAD' }))
                    setPlayerScore(0)
                    setPlayerSequence([])
                    setBotSequence([])
                    setIsModalOpen(false)
                    setPlayerInitials('')
                  }}
                  className={`Button ${orbitron.className} tracking-widest`}
                >
                  Play again?
                </button>
              </div>
            )}
            {shouldPostNewRecord && (
              <form
                onSubmit={(e) => handleSubmitScore(e)}
                className="flex flex-col items-center gap-2"
              >
                <label htmlFor="initials">Enter player initials:</label>
                <input
                  autoFocus
                  autoComplete="off"
                  data-1p-ignore
                  data-lp-ignore
                  type="text"
                  id="initials"
                  minLength={2}
                  maxLength={3}
                  value={playerInitials}
                  onChange={(e) => handleInputChange(e)}
                  className="border border-stone-400 text-2xl w-1/3 p-1 text-center font-bold"
                />
                <button
                  type="submit"
                  className={`Button ${orbitron.className} tracking-widest mt-2`}
                  disabled={playerInitials.length < 2}
                >
                  Submit score
                </button>
              </form>
            )}
          </div>
        </Modal>
      </>
    )
  } else
    return (
      <div className="mx-auto max-w-max flex justify-center items-center h-[200px] my-[173.5px] text-xl bg-white text-red-800 font-bold px-8">
        <p>There was an issue loading the game, please try again later!</p>
      </div>
    )
}
