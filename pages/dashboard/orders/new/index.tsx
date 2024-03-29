import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../../../graphql/mutation_vars";
import { useState } from "react";
import ModalContainer from "../../../../components/modals/ModalContainer";
import OrderProductsTable from "../../../../components/tables/OrderProductsTable";
import InfoCardSmall from "../../../../components/cards/InfoCardSmall";
import TextInput from "../../../../components/inputs/TextInput";
import SelectPrimary from "../../../../components/inputs/SelectPrimary";
import { listOfCities } from "../../../../utils/forms/listOfCities";
import { listOfStates } from "../../../../utils/forms/listOfStates";
import Checkbox from "../../../../components/inputs/Checkbox";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";

const CreateOrderModal = ({ products }) => {
  const [createOrder] = useMutation(CREATE_ORDER);

  const [cartItems, setCartItems] = useState([]);

  const [isSameChecked, setIsSameChecked] = useState(false);

  const initShippingBilling = {
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "Atlanta",
    state: "GA",
    zipcode: "",
    country: "USA",
  };

  const [shippingInfo, setShippingInfo] = useState(initShippingBilling);
  const [billingInfo, setBillingInfo] = useState(initShippingBilling);

  return (
    <ModalContainer size="max-w-7xl" title="Create Order">
      <div className="flex flex-col  lg:flex-row gap-6 ">
        <OrderProductsTable
          className="lg:w-2/3 w-full shadow-md "
          setCartItems={setCartItems}
        ></OrderProductsTable>
        <InfoCardSmall title="Cart" className="lg:w-1/3 h-full">
          <div className="flex flex-col h-64 overflow-y-auto border  dark:border-gray-700 rounded">
            {cartItems.map((item: any) => (
              <div
                key={item._id}
                className="odd:p-4 even:px-4 items-end flex justify-between"
              >
                <span className="">{item.name}</span>

                <input
                  className="h-min   dark:bg-gray-700 tex rounded-sm dark:text-gray-50  text-right"
                  value={item.qty}
                  onChange={(e) => {
                    const chosenQty = parseFloat(e.currentTarget.value);
                    if (isNaN(chosenQty) || chosenQty < 0) return;

                    setCartItems((prev: any) => {
                      if (chosenQty === 0) {
                        const removeItem = prev.filter(
                          (val: any) => val._id !== item._id
                        );

                        return removeItem;
                      }

                      return prev.map((val: any) => {
                        if (val._id === item._id) {
                          return {
                            ...val,
                            qty: chosenQty,
                          };
                        }
                        return val;
                      });
                    });
                  }}
                  type="number"
                ></input>
              </div>
            ))}
          </div>
          <div>Subtotal: </div>

          <div>
            Total:{" "}
            {cartItems.reduce((prev, acc: any) => {
              return prev + acc.price * acc.qty;
            }, 0)}
          </div>
        </InfoCardSmall>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (cartItems.length === 0) return;

          // shippingInput: shippingInfo,
          //       billingInput: isSameChecked ? shippingInfo : billingInfo,
          const parsedCartItems = cartItems.map((obj: any) => {
            const parsedProduct = {
              product: obj._id,
              qty: obj.qty,
            };
            return parsedProduct;
          });

          createOrder({
            variables: {
              orderInput: {
                products: parsedCartItems,
                shippingInput: {
                  ...shippingInfo,
                  zipcode: parseFloat(shippingInfo.zipcode),
                },
                billingInput: isSameChecked
                  ? {
                      ...shippingInfo,
                      zipcode: parseFloat(shippingInfo.zipcode),
                    }
                  : {
                      ...billingInfo,
                      zipcode: parseFloat(billingInfo.zipcode),
                    },
              },
            },
          })
            .then(() => {
              //   refetch();
              //   dispatch(addError('Order successfully created!'))
              //   dispatch(toggleModal({ value: null }))
            })
            .catch((error) => {
              // console.error(error.message)
            });
        }}
      >
        <div className="grid lg:grid-cols-2 gap-6">
          <InfoCardSmall title="Shipping" className="mt-6 lg:p-5 py-5">
            <div className="grid grid-cols-8 gap-6">
              <TextInput
                value={shippingInfo.firstName}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    firstName: e.currentTarget.value,
                  })
                }
                containerClassName="md:col-span-4 col-span-8"
                placeholder="First Name"
              />
              <TextInput
                value={shippingInfo.lastName}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    lastName: e.currentTarget.value,
                  })
                }
                containerClassName="md:col-span-4  col-span-8"
                placeholder="Last Name"
              />
              <TextInput
                value={shippingInfo.address}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    address: e.currentTarget.value,
                  })
                }
                containerClassName="md:col-span-4  col-span-8"
                placeholder="Address"
              />
              <TextInput
                value={shippingInfo.address2}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    address2: e.currentTarget.value,
                  })
                }
                containerClassName="md:col-span-4  col-span-8"
                placeholder="Address 2"
              />
              <SelectPrimary
                value={shippingInfo.city}
                onChange={(e: any) =>
                  setShippingInfo({
                    ...shippingInfo,
                    city: e.currentTarget.value,
                  })
                }
                containerClassName="md:col-span-3 col-span-6"
                label="City"
              >
                {listOfCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </SelectPrimary>

              <SelectPrimary
                value={shippingInfo.state}
                onChange={(e: any) =>
                  setShippingInfo({
                    ...shippingInfo,
                    state: e.currentTarget.value,
                  })
                }
                containerClassName="md:col-span-2 col-span-2"
                label="State"
              >
                {listOfStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </SelectPrimary>

              <TextInput
                value={shippingInfo.zipcode}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    zipcode: e.currentTarget.value,
                  })
                }
                containerClassName="md:col-span-3 col-span-4"
                placeholder="Zip"
              />

              <SelectPrimary
                value={shippingInfo.country}
                onChange={(e: any) =>
                  setShippingInfo({
                    ...shippingInfo,
                    country: e.currentTarget.value,
                  })
                }
                containerClassName="md:col-span-3 col-span-4"
                label="Country"
              >
                <option>USA</option>
              </SelectPrimary>
            </div>
          </InfoCardSmall>
          <InfoCardSmall
            className="mt-6 lg:p-5 py-5"
            title="Billing"
            altTitle={
              <div className="col-span-5 mt-1 text-right">
                <Checkbox
                  type="checkbox"
                  name="subcategory option"
                  onChange={(e: any) => {
                    setIsSameChecked(!isSameChecked);

                    setBillingInfo(initShippingBilling);
                  }}
                  checked={isSameChecked}
                  id="isSame"
                  label="Same as shipping"
                ></Checkbox>
              </div>
            }
          >
            <div
              className={`grid grid-cols-8 gap-6  ${
                isSameChecked && "opacity-40 pointer-events-none"
              }`}
            >
              <TextInput
                value={billingInfo.firstName}
                onChange={(e) => {
                  if (isSameChecked) return;
                  setBillingInfo({
                    ...billingInfo,
                    firstName: e.currentTarget.value,
                  });
                }}
                containerClassName="md:col-span-4 col-span-8 "
                placeholder="First Name"
              />
              <TextInput
                value={billingInfo.lastName}
                onChange={(e) => {
                  if (isSameChecked) return;
                  setBillingInfo({
                    ...billingInfo,
                    lastName: e.currentTarget.value,
                  });
                }}
                containerClassName="md:col-span-4  col-span-8"
                placeholder="Last Name"
              />
              <TextInput
                value={billingInfo.address}
                onChange={(e) => {
                  if (isSameChecked) return;
                  setBillingInfo({
                    ...billingInfo,
                    address: e.currentTarget.value,
                  });
                }}
                containerClassName="md:col-span-4  col-span-8"
                placeholder="Address"
              />
              <TextInput
                value={billingInfo.address2}
                onChange={(e) => {
                  if (isSameChecked) return;
                  setBillingInfo({
                    ...billingInfo,
                    address2: e.currentTarget.value,
                  });
                }}
                containerClassName="md:col-span-4  col-span-8"
                placeholder="Address 2"
              />
              <SelectPrimary
                value={billingInfo.city}
                onChange={(e: any) => {
                  if (isSameChecked) return;
                  setBillingInfo({
                    ...billingInfo,
                    city: e.currentTarget.value,
                  });
                }}
                containerClassName="md:col-span-3 col-span-6"
                label="City"
              >
                {listOfCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </SelectPrimary>

              <SelectPrimary
                value={billingInfo.state}
                onChange={(e: any) => {
                  if (isSameChecked) return;
                  setBillingInfo({
                    ...billingInfo,
                    state: e.currentTarget.value,
                  });
                }}
                containerClassName="md:col-span-2 col-span-2"
                label="State"
              >
                {listOfStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </SelectPrimary>

              <TextInput
                value={billingInfo.zipcode}
                onChange={(e) => {
                  if (isSameChecked) return;

                  setBillingInfo({
                    ...billingInfo,
                    zipcode: e.currentTarget.value,
                  });
                }}
                containerClassName="md:col-span-3 col-span-4"
                placeholder="Zip"
              />

              <SelectPrimary
                value={billingInfo.country}
                onChange={(e: any) => {
                  if (isSameChecked) return;

                  setBillingInfo({
                    ...billingInfo,
                    country: e.currentTarget.value,
                  });
                }}
                containerClassName="md:col-span-3 col-span-4"
                label="Country"
              >
                <option>USA</option>
              </SelectPrimary>
            </div>
            {/* <div className="grid grid-cols-2 gap-6">
              <TextInput containerClassName="" placeholder="First Name" />
              <TextInput containerClassName="" placeholder="Last Name" />
              <SelectPrimary></SelectPrimary>
            </div> */}
          </InfoCardSmall>
        </div>

        <div className="w-full flex flex-row-reverse justify-between mt-6">
          <PrimaryButton type="submit" className="px-3 py-1">
            Create Order
          </PrimaryButton>
          <SecondaryButton
            // onClick={(e: any) => dispatch(toggleModal({ value: null }))}
            className="px-3 py-1"
          >
            Back
          </SecondaryButton>
        </div>
      </form>
    </ModalContainer>
  );
};

export default CreateOrderModal;
