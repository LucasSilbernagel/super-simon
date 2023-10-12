'use client'

import getCollection from '@/app/firebase/getData'
import Tabs from '../Tabs/Tabs'
import { useEffect, useState } from 'react'
import { getTabsFromFirebase } from '@/app/utils/getTabsFromFirebase'

export interface ILeaderboardCollection {
  [key: string]: { id: string; player: string; score: number }[]
}

const Leaderboard = () => {
  const [allCollectionData, setAllCollectionData] =
    useState<ILeaderboardCollection>()

  const difficulties = ['easy', 'normal', 'hard', 'super-simon']

  useEffect(() => {
    const allCollections: ILeaderboardCollection = {}
    const fetchAllCollections = async () => {
      await Promise.all(
        difficulties.map(async (difficulty) => {
          try {
            const { results } = await getCollection(difficulty)
            allCollections[difficulty] = results
          } catch (error) {
            console.error(`Error fetching data for ${difficulty}: ${error}`)
          }
        })
      )
      setAllCollectionData(allCollections)
    }
    fetchAllCollections()
  }, [])

  if (allCollectionData) {
    return (
      <div className="max-w-max mx-auto bg-white text-black my-12 p-8 rounded-md">
        <Tabs
          tabs={getTabsFromFirebase(allCollectionData).map((tab) => {
            return {
              label: tab.label,
              content: (
                <ol className="list-decimal max-w-max mx-auto pt-4">
                  {tab.content
                    .sort((a, b) => b.score - a.score)
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
  } else return null
}

export default Leaderboard
