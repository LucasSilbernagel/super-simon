import { useEffect } from 'react'

/** Close a component on Escape key press */
function useCloseOnEscape(
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>
): void {
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && state) {
        setState(false)
      }
    })
  }, [state])
}

export default useCloseOnEscape
