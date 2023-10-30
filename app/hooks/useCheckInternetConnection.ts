import { useEffect } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { updateOnlineStatus } from '../redux/features/onlineStatusSlice'

/** Update state when the user's device connects to or disconnects from the internet */
const useCheckInternetConnection = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handleOnline = () => {
      dispatch(updateOnlineStatus({ value: true }))
    }
    const handleOffline = () => {
      dispatch(updateOnlineStatus({ value: false }))
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
}

export default useCheckInternetConnection
