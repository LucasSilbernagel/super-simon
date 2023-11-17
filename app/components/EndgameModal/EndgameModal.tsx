/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { updateGameStatus } from '@/app/redux/features/gameStatusSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './EndgameModal.css'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from 'react'
import { FaTimes } from 'react-icons/fa'
import addToCollection from '@/app/firebase/addData'
import { useRouter } from 'next/navigation'
import { orbitron } from '@/app/fonts'

interface IEndgameModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  setBotSequence: Dispatch<SetStateAction<string[]>>
  setGameboardError: Dispatch<SetStateAction<boolean>>
  setPlayerSequence: Dispatch<SetStateAction<string[]>>
  categoryScores: { id: string; player: string; score: number }[]
  playerScore: number
  setPlayerScore: Dispatch<SetStateAction<number>>
}

export default function EndgameModal(props: IEndgameModalProps) {
  const {
    isModalOpen,
    setIsModalOpen,
    setBotSequence,
    setGameboardError,
    setPlayerSequence,
    categoryScores,
    playerScore,
    setPlayerScore,
  } = props

  const isOnline = useAppSelector((state) => state.onlineStatusReducer)
  const selectedDifficulty = useAppSelector((state) => state.difficultyReducer)
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const [shouldPostNewRecord, setShouldPostNewRecord] = useState(false)
  const [playerInitials, setPlayerInitials] = useState('')

  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeModal = () => {
    setIsModalOpen(false)
    dispatch(updateGameStatus({ value: 'PAGELOAD' }))
    setPlayerScore(0)
    setPlayerSequence([])
    setBotSequence([])
    setPlayerInitials('')
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }
    if (isModalOpen) {
      dialogRef.current?.showModal()
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    } else if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isModalOpen, closeModal])

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
        setGameboardError(true)
        console.error('Error adding the document:', result.error)
      }
    } catch (error) {
      setGameboardError(true)
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
    if (playerInitials.length > 1 && playerInitials.length < 4) {
      addNewHighScore(playerInitials)
      setTimeout(() => {
        setIsModalOpen(false)
        setPlayerScore(0)
        setPlayerSequence([])
        setBotSequence([])
        setPlayerInitials('')
        push('/leaderboard')
        dispatch(updateGameStatus({ value: 'PAGELOAD' }))
      }, 100)
    }
  }

  return (
    <dialog ref={dialogRef} onClick={closeModal} className="EndgameModal">
      <div data-testid="endgame-modal" onClick={(e) => e.stopPropagation()}>
        <div className="w-full flex justify-end">
          <button
            data-testid="close-modal-button"
            aria-label="Close modal"
            onClick={closeModal}
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
        {!shouldPostNewRecord || !isOnline.value ? (
          <div className="text-center my-2">
            <button
              onClick={closeModal}
              className={`Button ${orbitron.className} tracking-widest`}
            >
              Play again?
            </button>
          </div>
        ) : null}
        {shouldPostNewRecord && isOnline.value && (
          <form
            onSubmit={(e) => handleSubmitScore(e)}
            className="flex flex-col items-center gap-2"
            data-testid="new-score-form"
          >
            <label htmlFor="initials">Enter player initials:</label>
            <input
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
              data-testid="initials-input"
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
    </dialog>
  )
}
