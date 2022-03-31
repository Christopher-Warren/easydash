import { useState, useRef } from 'react'
import { CategoryList } from '../filter/CategoryList'
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
}: any) => {
  const [checked, setChecked] = useState(false)
  const listRef = useRef<any>(null)
  const height =
    listRef.current?.children.length *
    listRef.current?.children[0]?.clientHeight

  const RenderOptions = () => {
    switch (name) {
      case 'category':
        return (
          <CategoryList
            categories={categories}
            categoriesState={categoriesState}
            setCategoriesState={setCategoriesState}
          />
        )

      case 'subcategory':
        return (
          <SubcategoryList
            subcategories={subcategories}
            subcategoriesState={subcategoriesState}
            setSubcategoriesState={setSubcategoriesState}
          />
        )

      case 'price':
        console.log(price)
        return (
          <li className="py-2">
            from
            <TextInput
              name="min price option"
              value={price.min}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setPrice((prev: any) => {
                  console.log()
                  return { ...prev, min: e.target.value }
                })
              }}
            >
              s
            </TextInput>
            to
            <TextInput
              name="max price option"
              // value={price.max}
            >
              s
            </TextInput>
          </li>
        )

      default:
        return <li>nothing</li>
    }
  }

  return (
    <div className="w-full pb-2 last-of-type:pb-0" key={name}>
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
        className={`text-lg flex justify-between items-center ${
          checked && 'text-purple-300'
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
          className={`text-right w-full transition-all duration-1000 opacity-100 
           overflow-hidden`}
          style={{ height: checked ? height : '0px' }}
          ref={listRef}
        >
          <RenderOptions></RenderOptions>
        </div>
        <div
          className={`absolute duration-1000  transition-opacity shadow-inner shadow-gray-800/60 ${
            checked ? ' ' : ''
          } bg-purple-100 dark:bg-gray-700 w-screen h-full top-0 -left-1/2 -z-10`}
        ></div>
      </ul>
    </div>
  )
}

export default SelectOption
