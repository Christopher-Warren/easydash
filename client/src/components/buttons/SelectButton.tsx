import { gql, useQuery } from '@apollo/client'
import { useRef, useState } from 'react'
import SelectOption from './SelectOption'

const SelectButton = ({
  options,
  buttonText,
  children,
  padding,
  id,
  className,
  type,
}: any) => {
  const [hide, setHide] = useState(true)

  const { data } = useQuery(gql`
    query getAllCategories {
      getAllCategories {
        name
        _id
        subcategories {
          name
          _id
        }
      }
    }
  `)

  return (
    <div className="relative">
      <button
        onBlur={(e: any) => {
          if (e.target === e.currentTarget) {
            setHide(true)
          }
        }}
        onClick={(e: any) => {
          e.preventDefault()
          if (e.target === e.currentTarget) {
            setHide(!hide)
          }
        }}
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
        {buttonText}
      </button>
      <div
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute rounded-sm overflow-hidden shadow-md shadow-gray-900
      dark:bg-gray-600 dark:text-white
    text-black z-40  bg-white
      ${hide && 'h-0 w-0 opacity-0'} `}
      >
        <div className="flex flex-wrap w-min px-3 py-2">
          <h1 className="text-xl text-center text-gray-400 w-full ">Filter</h1>
          <form>
            <SelectOption data={data} name="category"></SelectOption>
            <SelectOption data={data} name="subcategory"></SelectOption>

            <SelectOption data={data} name="price"></SelectOption>
            <SelectOption data={data} name="qty."></SelectOption>
          </form>
        </div>

        {/* {renderCategories()} */}
      </div>
    </div>
  )
}

export default SelectButton
