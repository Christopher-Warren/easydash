import { useRef } from 'react'

export default function useHasStateChanged(state: any[]) {
  const initState = useRef(state)

  const hasChanged = initState.current.some(
    (val: any, idx: number) => val !== state[idx],
  )

  return hasChanged
}
