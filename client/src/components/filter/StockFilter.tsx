import Checkbox from '../inputs/Checkbox'
import TextInput from '../inputs/TextInput'

const StockFilter = ({ name, stock, setStock }: any) => {
  const handleMinInput = (e: any) => {
    const val = e.currentTarget.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')

    const min = parseFloat(val)
    if (!min) {
      setStock((prev: any) => {
        return { ...prev, min: 0 }
      })
    } else {
      setStock((prev: any) => {
        return { ...prev, min }
      })
    }
  }

  const handleMaxInput = (e: any) => {
    const val = e.currentTarget.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')

    const max = parseFloat(val)
    if (!max) {
      setStock((prev: any) => {
        return { ...prev, max: 0 }
      })
    } else {
      setStock((prev: any) => {
        return { ...prev, max }
      })
    }
  }

  return (
    <li className="py-3 ">
      <div className="mb-3">
        <Checkbox
          type="checkbox"
          name="subcategory option"
          label="Show out of stock"
          id="out of stock"
          checked={stock.showOut}
          onChange={() =>
            setStock((prev: any) => ({
              min: 0,
              max: 0,
              showOut: !prev.showOut,
            }))
          }
          className="lg:w-4 w-5 h-5 lg:h-4 mt-1 accent-purple-500"
        ></Checkbox>
      </div>

      <TextInput
        className={`my-5 ${
          stock.min > stock.max &&
          stock.max > 0 &&
          'border-red-500 focus:border-red-500'
        }`}
        placeholder="Min. Qty."
        name="min stock option"
        type="number"
        value={stock.min}
        onChange={handleMinInput}
      ></TextInput>

      <TextInput
        className={`my-5 ${
          stock.min > stock.max &&
          stock.max > 0 &&
          'border-red-500 focus:border-red-500'
        }`}
        placeholder="Max. Qty."
        name="min stock option"
        type="number"
        value={stock.max}
        onChange={handleMaxInput}
      ></TextInput>
    </li>
  )
}

export default StockFilter
