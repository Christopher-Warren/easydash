import { useAppDispatch, useAppSelector } from '../redux/hooks'

import { addError, removeError } from '../redux/error/errorSlice'
import { useEffect, useRef, useState } from 'react'

const ErrorNotifs = () => {
  // This needs to be modularized.
  const [hideErr, setHideErr] = useState(false)

  const ref: any = useRef(0)

  const appError = useAppSelector((state) => state.error.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const el = document.querySelector(`#error-${0}`)
    console.log(appError.length)

    if (appError.length > 0) {
      ref.current = setTimeout(() => {
        el?.classList.add('fade-out')
        setTimeout(() => {
          el?.classList.remove('fade-out')
          dispatch(removeError(0))
        }, 750)
      }, 5000)
    }

    return function cleanup() {
      clearTimeout(ref.current)
    }
  }, [appError.length, dispatch])

  return (
    <div className="fixed bottom-20 right-20 ">
      {/* <button
        className="bg-black text-white p-2 rounded-sm"
        onClick={() =>
          dispatch(addError('There was an error processing your request.'))
        }
      >
        Create Error
      </button> */}
      <ol>
        {appError.map((err, index) => {
          const success = err.includes('success')
          const el = document.querySelector(`#error-${index}`)

          return (
            <li
              id={`error-${index}`}
              key={index}
              className={`text-white py-2 px-5  border rounded text-lg mt-4 error-animation bg-p
              ${success ? 'bg-green-500' : 'bg-red-500'}
             
              `}
            >
              <h1>{err + index}</h1>
              <button
                onClick={(e) => {
                  el?.classList.add('fade-out')

                  setTimeout(() => {
                    el?.classList.remove('fade-out')
                    dispatch(removeError(index))
                  }, 750)
                }}
              >
                X
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default ErrorNotifs
