import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const LeftNav = ({ getAllCategories, setOpen }) => {
  return (
    <>
      <button
        type="button"
        className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {/* Logo */}
      <div className="ml-4 flex lg:ml-0">
        <a href="#">
          <span className="sr-only">Workflow</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
            alt=""
          />
        </a>
      </div>
      {/* Flyout menus */}
      <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
        <div className="h-full flex space-x-8">
          <Popover className="flex">
            {({ open }) => (
              <>
                <div className="relative flex">
                  <Popover.Button
                    className={classNames(
                      open
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-700 hover:text-gray-800',
                      'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px',
                    )}
                  >
                    Shop
                  </Popover.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                    <div
                      className="absolute inset-0 top-1/2 bg-white shadow"
                      aria-hidden="true"
                    />

                    <div className="relative bg-white">
                      <div className="max-w-7xl mx-auto px-8">
                        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                          <div className="col-start-2 grid grid-cols-2 gap-x-8">
                            {getAllCategories.map((item, idx) => {
                              if (idx > 1) return null
                              return (
                                <div
                                  key={item.name}
                                  className="group relative text-base sm:text-sm"
                                >
                                  <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                    <img
                                      src={item.products[0].images[0]}
                                      alt={item.imageAlt}
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
                          <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                            {getAllCategories.map((category) => (
                              <div key={category.name}>
                                <p
                                  id={`${category.name}-heading`}
                                  className="font-medium text-gray-900"
                                >
                                  {category.name}
                                </p>
                                <ul
                                  aria-labelledby={`${category.name}-heading`}
                                  className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  {category.subcategories.map((subcategory) => (
                                    <li key={subcategory.name} className="flex">
                                      <a
                                        // href={subcategory.href}
                                        className="hover:text-gray-800"
                                      >
                                        {subcategory.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          {/* Can be mapped */}
          <a
            href="#"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Company
          </a>
        </div>
      </Popover.Group>
    </>
  )
}
