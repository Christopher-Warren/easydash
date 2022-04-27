import { useState, useRef } from 'react'
import { CategoryList } from '../filter/CategoryList'
import PriceFilter from '../filter/PriceFilter'
import StockFilter from '../filter/StockFilter'
import { SubcategoryList } from '../filter/SubcategoryList'
import TextInput from '../inputs/TextInput'

const SelectOption = ({
  name,
  categories,
  subcategories,
  categoriesState,
  setCategoriesState,
  subcategoriesState,
  setSubcategoriesState,
  price,
  setPrice,
  stock,
  setStock,

  children,
}: any) => {
  const [checked, setChecked] = useState(false)
  const listRef = useRef<any>(null)
  const height =
    listRef.current?.children.length *
    listRef.current?.children[0]?.clientHeight

  return (
    <div className="w-full" key={name}>
      <input
        name={name}
        id={name}
        className="hidden"
        onChange={(e) => {
          setChecked(!checked)
        }}
        checked={checked}
        type="checkbox"
      ></input>
      <label
        className={` py-4 px-5 text-lg flex justify-between text-gray-500 dark:text-gray-200  items-center cursor-pointer ${
          checked && 'dark:text-purple-400 text-purple-600 '
        }`}
        htmlFor={name}
      >
        {name}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={`inline transition-transform ml-10 ${
            checked && 'rotate-180'
          }`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </label>

      <ul className="relative">
        <div
          className={`w-full transition-all duration-500 ease-out opacity-100
           overflow-hidden`}
          style={{ height: checked ? height : '0px' }}
          ref={listRef}
        >
          {children}
        </div>
        <div
          className={`absolute duration-500  transition-opacity ${
            checked ? ' ' : ''
          } bg-purple-100 dark:bg-gray-900 w-screen h-full top-0 -left-1/2 -z-10`}
        ></div>
      </ul>
    </div>
  )
}

export default SelectOption
