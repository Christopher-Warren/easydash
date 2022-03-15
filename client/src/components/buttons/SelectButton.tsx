import { useState } from 'react'

const SelectButton = ({
  options,
  children,
  padding,
  id,
  className,
  type,
}: any) => {
  const [hide, setHide] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setHide(!hide)}
        id={id}
        type={type}
        className={`flex  justify-around font-medium text-md tracking-wide leading-relaxed rounded
        ${padding}
        ${className}
      bg-purple-600 text-white
      hover:bg-purple-700 hover:shadow-md 
        focus:shadow-md focus:outline-purple-500 focus:accent-purple-400
      shadow-purple-500/50 shadow
      transition-color duration-200
      `}
      >
        {children}
      </button>
      <div
        className={`absolute p-2 rounded ${
          hide &&
          'h-0 w-0 opacity-0 overflow-hidden pointer-events-none bg-transparent'
        } text-black z-40  bg-white`}
      >
        {options}
      </div>
    </div>
  )
}

export default SelectButton
