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
  const [hide, setHide] = useState(false)

  // const { data } = useQuery(gql`
  //   query getAllCategories {
  //     getAllCategories {
  //       name
  //       _id
  //       subcategories {
  //         name
  //         _id
  //       }
  //     }
  //   }
  // `)

  // const renderCategories = () => {
  //   if (!data) return
  //   return data.getAllCategories.map((i: any) => {
  //     console.log(i.subcategories)
  //     return i.name
  //   })
  // }

  // const [checked, setChecked] = useState(false)

  // const listRef = useRef<any>(null)

  // const height = listRef.current?.children[0].clientHeight

  return (
    <div className="relative">
      <button
        onBlur={(e: any) => {
          if (e.target === e.currentTarget) {
            setHide(!hide)
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
        className={`absolute p-2 rounded-sm overflow-hidden  ${
          hide &&
          'h-0 w-0 opacity-0 overflow-hidden pointer-events-none bg-transparent'
        } text-black z-40  bg-white`}
      >
        <div className="border border-red-500 flex flex-wrap px-4 w-max">
          <SelectOption name="category"></SelectOption>
          <SelectOption name="category 2"></SelectOption>
        </div>

        {/* {renderCategories()} */}
      </div>
    </div>
  )
}

export default SelectButton
