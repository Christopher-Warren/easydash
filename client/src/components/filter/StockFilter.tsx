import TextInput from '../inputs/TextInput'

const StockFilter = ({ name, stock, setStock }: any) => {
  return (
    <li className="py-2">
      from
      <TextInput
        name="min price option"
        value={stock.min}
        key={name}
        onChange={(e) => {
          setStock((prev: any) => {
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
}

export default StockFilter
