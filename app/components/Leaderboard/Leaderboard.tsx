'use client'

import getCollection from '@/app/firebase/getData'
import Tabs from '../Tabs/Tabs'
import { useEffect, useState } from 'react'
import { getTabsFromFirebase } from '@/app/utils/getTabsFromFirebase'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { useAppSelector } from '@/app/redux/hooks'
import { motion } from 'framer-motion'
import useCheckInternetConnection from '@/app/hooks/useCheckInternetConnection'

export interface ILeaderboardCollection {
  [key: string]: { id: string; player: string; score: number }[]
}

const Leaderboard = () => {
  const [allCollectionData, setAllCollectionData] =
    useState<ILeaderboardCollection>()
  const [isLoading, setIsLoading] = useState(true)
  const [leaderboardError, setLeaderboardError] = useState(false)

  const selectedDifficulty = useAppSelector((state) => state.difficultyReducer)

  const difficulties = ['easy', 'normal', 'hard', 'super-simon']

  const isOnline = useAppSelector((state) => state.onlineStatusReducer)

  useCheckInternetConnection()

  useEffect(() => {
    const allCollections: ILeaderboardCollection = {}
    const fetchAllCollections = async () => {
      setIsLoading(true)
      await Promise.all(
        difficulties.map(async (difficulty) => {
          try {
            const { results } = await getCollection(difficulty)
            allCollections[difficulty] = results
          } catch (error) {
            setLeaderboardError(true)
            console.error(`Error fetching data for ${difficulty}: ${error}`)
          }
        })
      )
      setAllCollectionData(allCollections)
      setIsLoading(false)
    }
    if (isOnline.value) {
      fetchAllCollections()
    }
  }, [])

  const loadingVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
  }

  if (allCollectionData && !isLoading && !leaderboardError && isOnline.value) {
    return (
      <motion.div
        variants={loadingVariants}
        initial="hidden"
        animate="enter"
        transition={{ delay: 0.5 }}
        className="max-w-max mx-auto bg-white text-black my-12 p-8 rounded-md"
      >
        <Tabs
          defaultTab={difficulties.findIndex(
            (item) =>
              item.toUpperCase().replace('-', ' ') === selectedDifficulty.value
          )}
          tabs={getTabsFromFirebase(allCollectionData).map((tab) => {
            return {
              label: tab.label,
              content: (
                <motion.ol
                  variants={loadingVariants}
                  initial="hidden"
                  animate="enter"
                  transition={{ delay: 0.2 }}
                  className="list-decimal max-w-max mx-auto pt-4 min-h-[330px]"
                >
                  {tab.content
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10)
                    .map((document) => {
                      return (
                        <li key={document.id} className="mb-2">
                          {document.player} - {document.score}{' '}
                          {document.score === 1 ? 'point' : 'points'}
                        </li>
                      )
                    })}
                </motion.ol>
              ),
            }
          })}
        />
      </motion.div>
    )
  } else if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[531px]">
        <Loader />
      </div>
    )
  } else if (!isOnline.value) {
    return (
      <ErrorMessage
        errorText={`Unable to load the leaderboard because you are offline!`}
      />
    )
  } else {
    return (
      <ErrorMessage
        errorText={`There was an issue loading the leaderboard, please try again later!`}
      />
    )
  }
}

export default Leaderboard
