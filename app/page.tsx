import CommonWrapper from './components/CommonWrapper'
import Difficulty from './components/Difficulty/Difficulty'
import GameBoard from './components/GameBoard/GameBoard'

export default function Home() {
  return (
    <CommonWrapper>
      <Difficulty />
      <GameBoard />
    </CommonWrapper>
  )
}
