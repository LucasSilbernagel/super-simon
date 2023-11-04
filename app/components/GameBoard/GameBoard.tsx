'use client'

import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './GameBoard.css'
import { useEffect, useState } from 'react'
import { getRandomInteger } from '@/app/utils/getRandomInteger'
import { Difficulty } from '../Difficulty/Difficulty'
import getCollection from '@/app/firebase/getData'
import removeFromCollection from '@/app/firebase/removeData'
import EndgameModal from '../EndgameModal/EndgameModal'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { motion } from 'framer-motion'
import { Howl } from 'howler'

export default function GameBoard() {
  const gameStatus = useAppSelector((state) => state.gameStatusReducer)
  const selectedDifficulty = useAppSelector((state) => state.difficultyReducer)
  const isOnline = useAppSelector((state) => state.onlineStatusReducer)

  const dispatch = useAppDispatch()

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
  const [gameboardError, setGameboardError] = useState(false)

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

  const tone0 = new Howl({
    src: ['audio/0.mp3'],
  })
  const tone1 = new Howl({
    src: ['audio/1.mp3'],
  })
  const tone2 = new Howl({
    src: ['audio/2.mp3'],
  })
  const tone3 = new Howl({
    src: ['audio/3.mp3'],
  })

  const tones = { '0': tone0, '1': tone1, '2': tone2, '3': tone3 }

  const handleWedgeClick = (id: string) => {
    setLastClickedWedge(id)
    tones[id as keyof typeof tones].play()
    const newPlayerSequence = [...playerSequence]
    newPlayerSequence.push(id)
    setPlayerSequence(newPlayerSequence)
  }

  useEffect(() => {
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
          tones[item as keyof typeof tones].play()
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
    // When the game first starts, add the first move to the bot sequence.
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
    if (gameStatus.value === 'STARTED' && botSequence.length > 0) {
      // If the player successfully matches the bot sequence, increment the score and add another item to the bot sequence.
      if (
        (botSequence.length === playerScore ||
          botSequence.length === playerSequence.length) &&
        botSequence.every((item, index) => playerSequence[index] === item)
      ) {
        setPlayerSequence([])
        setPlayerScore(playerScore + 1)
        const newBotSequence = [...botSequence]
        newBotSequence.push(String(getRandomInteger()))
        setBotSequence(newBotSequence)
      }
      // End the game if the player fails to match the sequence
      if (
        playerSequence.length > 0 &&
        !playerSequence.every((item, index) => botSequence[index] === item)
      ) {
        dispatch(updateGameStatus({ value: 'FINISHED' }))
        setIsModalOpen(true)
      }
    }
  }, [gameStatus.value, botSequence, playerScore, playerSequence])

  useEffect(() => {
    // Get the leaderboard for the difficulty level being played
    const fetchCollectionData = async () => {
      try {
        const data = await getCollection(
          selectedDifficulty.value.toLowerCase().replace(' ', '-')
        )
        setCategoryScores(data.results.sort((a, b) => b.score - a.score))
      } catch (error) {
        setGameboardError(true)
        console.error(error)
      }
    }
    if (isOnline.value) {
      fetchCollectionData()
    }
  }, [playerScore, selectedDifficulty.value, isOnline.value])

  useEffect(() => {
    // If a leaderboard category has more than 10 scores, remove the lowest scores so that only 10 remain
    const onlySaveTenScoresPerCategory = async () => {
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
              setGameboardError(true)
              console.error('Error removing the document:', result.error)
            }
          } catch (error) {
            setGameboardError(true)
            console.error('An error occurred:', error)
          }
        }
      }
    }
    if (isOnline.value) {
      onlySaveTenScoresPerCategory()
    }
  }, [categoryScores, selectedDifficulty, isOnline.value])

  const isSuperSimonMode =
    gameStatus.value === 'STARTED' && selectedDifficulty.value === 'SUPER SIMON'

  const loadingVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
  }

  if (!gameboardError) {
    return (
      <>
        {gameStatus.value !== 'PAGELOAD' && (
          <motion.div
            variants={loadingVariants}
            initial="hidden"
            animate="enter"
            transition={{ duration: 0.8 }}
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
          </motion.div>
        )}
        <EndgameModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setBotSequence={setBotSequence}
          setGameboardError={setGameboardError}
          setPlayerSequence={setPlayerSequence}
          categoryScores={categoryScores}
          playerScore={playerScore}
          setPlayerScore={setPlayerScore}
        />
      </>
    )
  } else
    return (
      <ErrorMessage
        errorText={`There was an issue loading the game, please try again later!`}
      />
    )
}
