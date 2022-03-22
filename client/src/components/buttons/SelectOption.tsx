import { useState, useRef } from 'react'

const SelectOption = ({ name }: any) => {
  const [checked, setChecked] = useState(false)
  const listRef = useRef<any>(null)
  const height = listRef.current?.children[0].clientHeight

  console.log('render')
  return (
    <div className="w-full  hover:border" key={name}>
      <input
        name={name}
        id={name}
        onClick={() => console.log(name)}
        onChange={(e) => {
          console.log(name)
          setChecked(!checked)
        }}
        checked={checked}
        className="peer "
        type="checkbox"
      ></input>
      <label
        // onClick={() => setChecked(!checked)}
        className="ml-2 text-xl inline-block "
      >
        Category
      </label>

      <ul
        style={{ height: checked ? height + 'px' : '0px' }}
        className=" relative text-right w-full transition-all duration-1000 opacity-0 peer-checked:opacity-100 pointer-events-none peer-checked:pointer-events-auto"
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
  )
}

export default SelectOption
