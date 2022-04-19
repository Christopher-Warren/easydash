import { useState } from 'react'

const SelectPrimary = ({
  id,
  className,
  value,
  onChange,
  children,
  containerClassName,
  label,
}: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative ${containerClassName} `}>
      <select
        id={id}
        className={`${className} peer capitalize dark:children:text-gray-50 dark:children:bg-gray-700 bg-transparent border-b-2  border-gray-200 focus:border-purple-400  py-1.5  outline-none appearance-none w-full
      `}
        value={value}
        onBlur={(e) => setIsOpen(false)}
        onClick={(e) => setIsOpen(!isOpen)}
        onChange={onChange}
      >
        {children}
      </select>
      <span className="text-gray-400   -my-4 mx-1 absolute top-0 left-0 text-sm peer-focus:text-purple-400">
        {label}
      </span>
      <div
        className={`absolute top-0 mt-2 right-0 pointer-events-none  transition-all ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  )
}

export default SelectPrimary
