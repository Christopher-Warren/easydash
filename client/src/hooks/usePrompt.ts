const usePrompt = (state: any[], args: any) => {
  // console.log(state.some((val: any) => val.length > 0))

  if (!args) {
    // console.log(state)
    return state.some((val: any) => val.length > 0)
  }

  return 'cool stuff2'
}

export default usePrompt
