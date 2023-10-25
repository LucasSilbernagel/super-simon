'use client'
import { motion } from 'framer-motion'

const ErrorMessage = ({ errorText }: { errorText: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-max flex justify-center items-center h-[200px] my-[173.5px] text-xl bg-white text-red-800 font-bold px-8"
    >
      <p>{errorText}</p>
    </motion.div>
  )
}

export default ErrorMessage
