import { gql, useQuery } from '@apollo/client'
import { useRef, useState } from 'react'

const SelectButton = ({
  options,
  children,
  padding,
  id,
  className,
  type,
}: any) => {
  const [hide, setHide] = useState(true)

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

  const [checked, setChecked] = useState(false)

  const listRef = useRef<any>(null)

  const height = listRef.current?.children[0].clientHeight

  console.log('rerender')
  return (
    <div className="relative">
      <button
        onBlur={(e: any) => {
          console.log('shouldnt fine')
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
        {children}
      </button>
      <div
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute p-2 rounded-sm overflow-hidden  ${
          hide &&
          'h-0 w-0 opacity-0 overflow-hidden pointer-events-none bg-transparent'
        } text-black z-40  bg-white`}
      >
        <div className="px-4 w-max">
          <div className="flex flex-wrap">
            <input
              name="checkbox"
              id="checkbox"
              onChange={(e) => {
                setChecked(!checked)
              }}
              checked={checked}
              className="peer "
              type="checkbox"
            ></input>
            <label
              onClick={() => setChecked(!checked)}
              className="ml-2 text-xl inline-block "
            >
              Category
            </label>

            <ul
              style={{ height: checked ? height : '0px' }}
              className=" relative text-right w-full transition-all duration-1000 opacity-0 peer-checked:opacity-100"
              ref={listRef}
            >
              <div className="">
                {/* Data/Options */}
                <li>thing</li>
                <li>thing</li>
                <li>thing</li>
                <li>thing</li>
                <li>thing</li>
              </div>
              <div className="absolute bg-red-200 w-screen h-full top-0 -left-1/2 -z-10"></div>
            </ul>
          </div>
        </div>

        {/* {renderCategories()} */}
      </div>
    </div>
  )
}

export default SelectButton
