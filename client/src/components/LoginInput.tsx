import { useState } from 'react'

const LoginInput = ({
  children,
  id,
  name,
  type,
  required,
  minLength,
  defaultValue,
}: any) => {
  const [active, setActive] = useState(() => {
    return true
  })
  return (
    <>
      <div className="relative my-4">
        <label
          className={`absolute z-10 text-gray-400  left-3.5 pointer-events-none transition-all ease-in-out duration-200   ${
            active
              ? 'transform scale-90 top-0 origin-left text-purple-500'
              : 'top-1/4 origin-left'
          }`}
          htmlFor={id}
        >
          {children}
        </label>

        <input
          defaultValue={defaultValue ? defaultValue : null}
          name={name}
          onChange={(e) => {
            if (e.target.value) setActive(true)
          }}
          onFocus={(e) => {
            setActive(true)
          }}
          onBlur={(e) => {
            if (!e.target.value) {
              setActive(false)
            }
          }}
          type={type}
          className={`border text-gray-800 border-gray-400 rounded-sm pt-4 pb-1 pl-3 w-full text-lg focus:outline-purple hover:border-purple-500`}
          id={id}
          required={required}
          minLength={minLength}
        ></input>
      </div>
    </>
  )
}

export default LoginInput
