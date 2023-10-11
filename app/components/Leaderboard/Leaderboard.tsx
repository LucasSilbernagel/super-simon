'use client'

import getCollection from '@/app/firebase/getData'
import Tabs from '../Tabs/Tabs'
import { useEffect, useState } from 'react'

interface ILeaderboardCollection {
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

  console.log(allCollectionData)

  if (allCollectionData) {
    return (
      <div className="max-w-max mx-auto bg-white text-black my-12 p-8 rounded-md">
        <Tabs
          tabs={[
            {
              label: 'EASY',
              content: (
                <ol className="list-decimal">
                  {allCollectionData['easy'].map((document) => {
                    return (
                      <li key={document.id}>
                        <span>Player:</span> {document.player} -{' '}
                        <span>Score:</span> {document.score}
                      </li>
                    )
                  })}
                </ol>
              ),
            },
            {
              label: 'NORMAL',
              content: (
                <ol className="list-decimal">
                  {allCollectionData['normal'].map((document) => {
                    return (
                      <li key={document.id}>
                        <span>Player:</span> {document.player} -{' '}
                        <span>Score:</span> {document.score}
                      </li>
                    )
                  })}
                </ol>
              ),
            },
            {
              label: 'HARD',
              content: (
                <ol className="list-decimal">
                  {allCollectionData['hard'].map((document) => {
                    return (
                      <li key={document.id}>
                        <span>Player:</span> {document.player} -{' '}
                        <span>Score:</span> {document.score}
                      </li>
                    )
                  })}
                </ol>
              ),
            },
            {
              label: 'SUPER SIMON',
              content: (
                <ol className="list-decimal">
                  {allCollectionData['super-simon'].map((document) => {
                    return (
                      <li key={document.id}>
                        <span>Player:</span> {document.player} -{' '}
                        <span>Score:</span> {document.score}
                      </li>
                    )
                  })}
                </ol>
              ),
            },
          ]}
        />
      </div>
    )
  } else return null
}

export default Leaderboard
