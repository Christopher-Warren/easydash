import { useState } from 'react'
import chevron from '../../assets/feather/chevron-down.svg'

const SelectInput = ({ id, className, value, onChange, children }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full ">
      <select
        id={id}
        className={`${className} h-10  bg-transparent border-b-2  border-gray-200 focus:border-purple-400  py-1.5  outline-none appearance-none w-full
      `}
        value={value}
        onBlur={(e) => setIsOpen(false)}
        onClick={(e) => setIsOpen(!isOpen)}
        onChange={onChange}
      >
        {children}
      </select>
      <div
        className={`absolute top-0 mt-2 right-0 pointer-events-none  transition-all ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      >
        <img src={chevron} alt="" />
      </div>
    </div>
  )
}

export default SelectInput
