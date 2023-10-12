import { ILeaderboardCollection } from '../components/Leaderboard/Leaderboard'

export const getTabsFromFirebase = (
  data: ILeaderboardCollection
): {
  label: string
  content: { id: string; player: string; score: number }[]
}[] => {
  const orderedLabels = ['easy', 'normal', 'hard', 'super-simon']
  const result: {
    label: string
    content: { id: string; player: string; score: number }[]
  }[] = []
  for (const label of orderedLabels) {
    if (data && Object.prototype.hasOwnProperty.call(data, label)) {
      const formattedLabel = label.replace('-', ' ')
      const content = data[label]
      result.push({ label: formattedLabel, content })
    }
  }
  return result
}
