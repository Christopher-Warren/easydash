import { useRef } from 'react'

const useIsFirstLoad = () => {
  const load = useRef(0)
  console.log(load.current)

  // has loaded, return
  if (load.current === 1) return true

  load.current++

  return false
}

export default useIsFirstLoad
