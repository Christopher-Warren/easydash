import TextInput from '../inputs/TextInput'

const PriceFilter = ({ name, price, setPrice }: any) => {
  const handleMinInput = (e: any) => {
    const val = e.currentTarget.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')

    const min = parseFloat(val)
    if (!min) {
      setPrice((prev: any) => {
        return { ...prev, min: 0 }
      })
    } else {
      setPrice((prev: any) => {
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
      setPrice((prev: any) => {
        return { ...prev, max: 0 }
      })
    } else {
      setPrice((prev: any) => {
        return { ...prev, max }
      })
    }
  }

  return (
    <li className="py-3 ">
      <TextInput
        className={`my-5 ${
          price.min > price.max &&
          price.max > 0 &&
          'border-red-500 focus:border-red-500'
        }`}
        placeholder="Min. Price"
        name="min price option"
        type="number"
        value={price.min}
        onChange={handleMinInput}
      ></TextInput>

      <TextInput
        className={`my-5 ${
          price.min > price.max &&
          price.max > 0 &&
          'border-red-500 focus:border-red-500'
        }`}
        placeholder="Max. Price"
        name="min price option"
        type="number"
        value={price.max}
        onChange={handleMaxInput}
      ></TextInput>
    </li>
  )
}

export default PriceFilter
