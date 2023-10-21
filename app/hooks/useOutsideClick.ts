import { useEffect, useRef } from 'react'

/** Trigger a function when clicking outside a component */
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback])
  return ref
}

export default useOutsideClick
