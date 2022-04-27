import TextInput from '../inputs/TextInput'

const TotalFilter = ({ name, total, setTotal }: any) => {
  const handleMinInput = (e: any) => {
    const val = e.currentTarget.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')

    const min = parseFloat(val)
    if (!min) {
      setTotal((prev: any) => {
        return { ...prev, min: 0 }
      })
    } else {
      setTotal((prev: any) => {
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
      setTotal((prev: any) => {
        return { ...prev, max: 0 }
      })
    } else {
      setTotal((prev: any) => {
        return { ...prev, max }
      })
    }
  }

  return (
    <li className="">
      <div className="px-5 py-5">
        <TextInput
          className={`my-5 ${
            total.min > total.max &&
            total.max > 0 &&
            'border-red-500 focus:border-red-500'
          }`}
          placeholder="Min. Price"
          name="min total option"
          type="number"
          value={total.min}
          onChange={handleMinInput}
        ></TextInput>

        <TextInput
          className={` ${
            total.min > total.max &&
            total.max > 0 &&
            'border-red-500 focus:border-red-500'
          }`}
          placeholder="Max. Price"
          name="min total option"
          type="number"
          value={total.max}
          onChange={handleMaxInput}
        ></TextInput>
      </div>
    </li>
  )
}

export default TotalFilter
