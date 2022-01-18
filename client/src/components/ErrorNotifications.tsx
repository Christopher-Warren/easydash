import { useAppDispatch, useAppSelector } from '../redux/hooks'

import { removeError } from '../redux/error/errorSlice'
import { useEffect, useRef } from 'react'

const ErrorNotifications = () => {
  const ref: any = useRef(0)

  const appError = useAppSelector((state) => state.error.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const el = document.querySelector(`#error-${0}`)
    if (appError.length > 0) {
      ref.current = setTimeout(() => {
        el?.classList.add('error-fade-out')
        setTimeout(() => {
          el?.classList.remove('error-fade-out')
          dispatch(removeError(0))
        }, 750)
      }, 5000)
    }

    return function cleanup() {
      clearTimeout(ref.current)
    }
  }, [appError.length, dispatch])

  return (
    <div className="fixed lg:bottom-20 bottom-5 lg:right-20 lg:left-auto right-1/4 left-1/4 z-20">
      <ol>
        {appError.map((err, index) => {
          const success = err.includes('success')

          return (
            <li
              id={`error-${index}`}
              key={index}
              className={`text-white py-2 px-5 min-w-max border border-gray-200 rounded text-lg mt-4 error-fade-in bg-opacity-75
              ${success ? 'bg-green-500' : 'bg-red-500'}
             
              `}
            >
              <h1 className="text-center">{err}</h1>
              {/* Optional: Add a button to allow user to dismiss errors. A large X followed by the message.
              Said X could have a padding of x, and hover of #fff */}
              {/* <button
                onClick={(e) => {
                  const el = document.querySelector(`#error-${index}`)

                  el?.classList.add('fade-out')

                  setTimeout(() => {
                    el?.classList.remove('fade-out')
                    dispatch(removeError(index))
                  }, 750)
                }}
              >
                X
              </button> */}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default ErrorNotifications
