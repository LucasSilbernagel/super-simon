'use client'
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { updateIsMuted } from '@/app/redux/features/mutedSlice'

const MuteButton = () => {
  const isMuted = useAppSelector((state) => state.mutedReducer)
  const dispatch = useAppDispatch()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute top-4 left-4 sm:top-4 sm:left-8 sm:text-lg transition-all duration-300 hover:scale-105 focus-visible:scale-105"
    >
      <button
        onClick={() => dispatch(updateIsMuted({ value: !isMuted.value }))}
        aria-label={isMuted.value ? 'turn sound on' : 'turn sound off'}
      >
        {isMuted.value ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </motion.div>
  )
}

export default MuteButton
