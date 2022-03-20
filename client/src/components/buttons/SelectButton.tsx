import { gql, useQuery } from '@apollo/client'
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

  const renderCategories = () => {
    if (!data) return
    return data.getAllCategories.map((i: any) => {
      console.log(i.subcategories)
      return i.name
    })
  }

  return (
    <div className="relative">
      <button
        // onClick={(e: any) => {
        //   setHide(!hide)
        // }}
        // onBlur={(e: any) => {
        //   setHide(true)
        // }}
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
        onMouseDown={(e) => {
          e.preventDefault()
        }}
        className={`absolute p-2 rounded-sm  ${
          hide &&
          'h-0 w-0 opacity-0 overflow-hidden pointer-events-none bg-transparent'
        } text-black z-40  bg-white`}
      >
        <div className="px-4">
          <div className=" flex">
            <input
              className=""
              id="categories"
              placeholder="aaa"
              type="checkbox"
            ></input>
            <label className="ml-2 text-xl" htmlFor="categories">
              Category
            </label>
          </div>
          <ul className="border text-right">
            <li>thing</li>
            <li>thing</li>
            <li>thing</li>
          </ul>

          <div className=" flex">
            <input
              className=""
              id="categories"
              placeholder="aaa"
              type="checkbox"
            ></input>
            <label className="ml-2 text-xl" htmlFor="categories">
              Subategory
            </label>
          </div>
          <ul className="border text-right">
            <li>thing</li>
            <li>thing</li>
            <li>thing</li>
          </ul>
        </div>

        <div className=" flex">
          <input
            className=""
            id="categories"
            placeholder="aaa"
            type="checkbox"
          ></input>
          <label className="ml-2 text-xl" htmlFor="categories">
            Price
          </label>
        </div>
        <ul className="border text-right">
          <li>thing</li>
          <li>thing</li>
          <li>thing</li>
        </ul>

        <div className=" flex">
          <input
            className=""
            id="categories"
            placeholder="aaa"
            type="checkbox"
          ></input>
          <label className="ml-2 text-xl" htmlFor="categories">
            Quantity
          </label>
        </div>
        <ul className="border text-right">
          <li>thing</li>
          <li>thing</li>
          <li>thing</li>
        </ul>

        {/* {renderCategories()} */}
      </div>
    </div>
  )
}

export default SelectButton
