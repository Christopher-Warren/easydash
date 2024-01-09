import TextInput from '../../inputs/TextInput'

const OrderNumberFilter = ({ name, orderNumber, setOrderNumber }: any) => {
  const handleMinInput = (e: any) => {
    const val = e.currentTarget.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')

    const min = parseFloat(val)
    if (!min) {
      setOrderNumber((prev: any) => {
        return { ...prev, min: 0 }
      })
    } else {
      setOrderNumber((prev: any) => {
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
      setOrderNumber((prev: any) => {
        return { ...prev, max: 0 }
      })
    } else {
      setOrderNumber((prev: any) => {
        return { ...prev, max }
      })
    }
  }

  return (
    <li className="">
      <div className="px-5 py-5">
        <TextInput
          className={`my-5 ${
            orderNumber.min > orderNumber.max &&
            orderNumber.max > 0 &&
            'border-red-500 focus:border-red-500'
          }`}
          placeholder="Between"
          name="min orderNumber option"
          type="number"
          value={orderNumber.min}
          onChange={handleMinInput}
        ></TextInput>

        <TextInput
          className={` ${
            orderNumber.min > orderNumber.max &&
            orderNumber.max > 0 &&
            'border-red-500 focus:border-red-500'
          }`}
          placeholder="And"
          name="min orderNumber option"
          type="number"
          value={orderNumber.max}
          onChange={handleMaxInput}
        ></TextInput>
      </div>
    </li>
  )
}

export default OrderNumberFilter
