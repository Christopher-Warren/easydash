import { useState, useRef } from 'react'

const SelectOption = ({ name, data, subcategories }: any) => {
  const [checked, setChecked] = useState(false)
  const listRef = useRef<any>(null)
  const height =
    listRef.current?.children.length *
    listRef.current?.children[0]?.clientHeight

  const CategoryList = ({ data }: any) => {
    const [categoriesState, setCategoriesState] = useState<any>([])

    if (!data) return null
    const handleCategoriesState = (e: any) => {
      const targetIndex = parseFloat(e.currentTarget.id)
      if (categoriesState.length !== data.getAllCategories.length) {
        setCategoriesState(
          data.getAllCategories.map((category: any, index: number) => {
            if (targetIndex === index) return true
            return false
          }),
        )
      }
      if (categoriesState.length === data.getAllCategories.length) {
        setCategoriesState((prev: any) =>
          prev.map((category: any, index: number) => {
            if (targetIndex === index) return !category
            return category
          }),
        )
      }
    }
    return data.getAllCategories.map((i: any, index: number) => {
      return (
        <li key={index} className="py-2">
          <input
            type="checkbox"
            name="category option"
            value={i.name}
            onChange={handleCategoriesState}
            id={index.toString()}
            checked={categoriesState[index] ? true : false}
            className="lg:w-4 w-5 h-5 lg:h-4 mt-1 accent-purple-500"
          ></input>
          <label htmlFor={index.toString()}>{i.name}</label>
        </li>
      )
    })
  }

  const SubcategoryList = ({ data }: any) => {
    const [categoriesState, setCategoriesState] = useState<any>([])

    if (!data) return null
    const handleCategoriesState = (e: any) => {
      const targetIndex = parseFloat(e.currentTarget.id)
      if (categoriesState.length !== data.getAllSubcategories.length) {
        setCategoriesState(
          data.getAllSubcategories.map((category: any, index: number) => {
            if (targetIndex === index) return true
            return false
          }),
        )
      }
      if (categoriesState.length === data.getAllSubcategories.length) {
        setCategoriesState((prev: any) =>
          prev.map((category: any, index: number) => {
            if (targetIndex === index) return !category
            return category
          }),
        )
      }
    }
    return data.getAllSubcategories.map((i: any, index: number) => {
      return (
        <li key={index} className="py-2">
          <input
            type="checkbox"
            name="subcategory option"
            value={i.name}
            onChange={handleCategoriesState}
            id={index.toString()}
            checked={categoriesState[index] ? true : false}
            className="lg:w-4 w-5 h-5 lg:h-4 mt-1 accent-purple-500"
          ></input>
          <label htmlFor={index.toString()}>{i.name}</label>
        </li>
      )
    })
  }

  const RenderOptions = () => {
    if (!data) return null
    switch (name) {
      case 'category':
        return <CategoryList data={data} />

      case 'subcategory':
        return <SubcategoryList data={subcategories} />

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
