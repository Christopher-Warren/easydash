import { Dialog, Tab, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { XIcon } from '@heroicons/react/outline'

export const MobileNav = ({ open, setOpen, getAllCategories }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <Tab.Group as="div" className="mt-2">
              {/* <div className="border-b border-gray-200">
              <Tab.List className="-mb-px flex px-4 space-x-8">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? 'text-indigo-600 border-indigo-600'
                        : 'text-gray-900 border-transparent',
                      'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium',
                    )
                  }
                >
                  Shop
                </Tab>
              </Tab.List>
            </div> */}
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="pt-10 pb-8 px-4 space-y-10">
                  <div className="grid grid-cols-2 gap-x-4">
                    {getAllCategories.map((item, idx) => {
                      if (idx > 1) return null
                      return (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                            <img
                              src={item.products[0].images[0]}
                              alt={item.name}
                              className="object-center object-cover"
                            />
                          </div>
                          <a
                            href="#"
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              className="absolute z-10 inset-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      )
                    })}
                  </div>
                  {getAllCategories.map((category) => (
                    <div key={category.name}>
                      <p
                        id={`${category.id}-${category.id}-heading-mobile`}
                        className="font-medium text-gray-900"
                      >
                        {category.name}
                      </p>
                      <ul
                        aria-labelledby={`${category.id}-${category.id}-heading-mobile`}
                        className="mt-6 flex flex-col space-y-6"
                      >
                        {category.subcategories.map((item) => (
                          <li key={item.name} className="flow-root">
                            <a
                              // href={item.href}
                              className="-m-2 p-2 block text-gray-500"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              {/* can be mapped */}
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 p-2 block font-medium text-gray-900"
                >
                  Company
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 p-2 block font-medium text-gray-900"
                >
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 p-2 block font-medium text-gray-900"
                >
                  Create account
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4">
              <a href="#" className="-m-2 p-2 flex items-center">
                <img
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt=""
                  className="w-5 h-auto block flex-shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">
                  CAD
                </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
