import Checkbox from '../../inputs/Checkbox'

const StatusFilter = ({
  statusChecked,
  setStatusChecked,

  paymentActive,
  setPaymentActive,
  fulfillmentActive,
  setFulfillmentActive,
}: any) => {
  return (
    <ul className="">
      <li className="flex items-center justify-between">
        <span className="mb-2 mt-4 mx-5 inline-block text-lg">Payment</span>
        <Checkbox
          onChange={(e: any) => setPaymentActive(!paymentActive)}
          checked={paymentActive}
          className="mx-5"
          label="Active"
        />
      </li>
      <li>
        <Checkbox
          name="status option"
          checked={statusChecked.paid}
          onChange={(e: any) =>
            setStatusChecked({ ...statusChecked, paid: true })
          }
          className="py-3 px-5"
          label="Paid"
        />
      </li>
      <li className="">
        <Checkbox
          checked={!statusChecked.paid}
          onChange={(e: any) =>
            setStatusChecked({
              ...statusChecked,
              paid: false,
            })
          }
          name="status option"
          className="py-3 px-5"
          label="Unpaid"
        />
      </li>
      <li className="flex items-center justify-between border-t border-gray-700">
        <span className="mb-2 mt-4 mx-5 inline-block text-lg">Fulfillment</span>
        <Checkbox
          onChange={(e: any) => setFulfillmentActive(!fulfillmentActive)}
          checked={fulfillmentActive}
          className="mx-5"
          label="Active"
        />
      </li>
      <li className="">
        <Checkbox
          name="status option"
          checked={statusChecked.fulfilled}
          onChange={(e: any) =>
            setStatusChecked({ ...statusChecked, fulfilled: true })
          }
          className="py-3 px-5"
          label="Fulfilled"
        />
      </li>
      <li className="">
        <Checkbox
          checked={!statusChecked.fulfilled}
          onChange={(e: any) =>
            setStatusChecked({
              ...statusChecked,
              fulfilled: false,
            })
          }
          name="status option"
          className="py-3 px-5"
          label="Unfulfilled"
        />
      </li>
    </ul>
  )
}

export default StatusFilter
