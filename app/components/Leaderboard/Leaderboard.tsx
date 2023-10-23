'use client'

import getCollection from '@/app/firebase/getData'
import Tabs from '../Tabs/Tabs'
import { useEffect, useState } from 'react'
import { getTabsFromFirebase } from '@/app/utils/getTabsFromFirebase'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { useAppSelector } from '@/app/redux/hooks'

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
    fetchAllCollections()
  }, [])

  if (allCollectionData && !isLoading && !leaderboardError) {
    return (
      <div className="max-w-max mx-auto bg-white text-black my-12 p-8 rounded-md">
        <Tabs
          defaultTab={difficulties.findIndex(
            (item) =>
              item.toUpperCase().replace('-', ' ') === selectedDifficulty.value
          )}
          tabs={getTabsFromFirebase(allCollectionData).map((tab) => {
            return {
              label: tab.label,
              content: (
                <ol className="list-decimal max-w-max mx-auto pt-4 min-h-[330px]">
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
                </ol>
              ),
            }
          })}
        />
      </div>
    )
  } else if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[531px]">
        <Loader />
      </div>
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
