import Checkbox from '../../inputs/Checkbox'

const StatusFilter = ({ statusChecked, setStatusChecked }: any) => {
  console.log(statusChecked)
  return (
    <ul className="">
      <li className="border-b border-gray-700">
        <Checkbox className="py-3 px-5" label="Active" />
      </li>
      <li className="">
        <Checkbox
          name="status option"
          checked={statusChecked.paid}
          onChange={(e: any) =>
            setStatusChecked({ ...statusChecked, paid: !statusChecked.paid })
          }
          className="py-3 px-5"
          label="Paid"
        />
      </li>
      <li className="">
        <Checkbox
          checked={statusChecked.fulfilled}
          onChange={(e: any) =>
            setStatusChecked({
              ...statusChecked,
              fulfilled: !statusChecked.fulfilled,
            })
          }
          name="status option"
          className="py-3 px-5"
          label="Fulfilled"
        />
      </li>
    </ul>
  )
}

export default StatusFilter
