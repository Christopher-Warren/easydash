import { useState, useRef } from 'react'

const SelectOption = ({ name, data }: any) => {
  const [checked, setChecked] = useState(false)
  const listRef = useRef<any>(null)
  const height =
    listRef.current?.children.length *
    listRef.current?.children[0]?.clientHeight

  const RenderOptions = () => {
    if (!data) return null
    switch (name) {
      case 'category':
        const categories = data.getAllCategories.map(
          (i: any, index: number) => {
            return <li key={index}>{i.name}</li>
          },
        )

        // console.log(categories)

        return categories

      case 'subcategory':
        const thing = data.getAllCategories.map((i: any) => {
          return i.subcategories
        })

        return <li>subcategories</li>

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
