import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline'
export const RightNav = ({ totalQuantity }) => {
  return (
    <div className="ml-auto flex items-center">
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Sign in
        </a>
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Create account
        </a>
      </div>

      <div className="hidden lg:ml-8 lg:flex">
        <a
          href="#"
          className="text-gray-700 hover:text-gray-800 flex items-center"
        >
          <img
            src="https://tailwindui.com/img/flags/flag-canada.svg"
            alt=""
            className="w-5 h-auto block flex-shrink-0"
          />
          <span className="ml-3 block text-sm font-medium">CAD</span>
          <span className="sr-only">, change currency</span>
        </a>
      </div>

      {/* Search */}
      <div className="flex lg:ml-6">
        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-6 h-6" aria-hidden="true" />
        </a>
      </div>

      {/* Cart */}
      <div className="ml-4 flow-root lg:ml-6">
        <a href="#" className="group -m-2 p-2 flex items-center">
          <ShoppingBagIcon
            className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {totalQuantity}
          </span>
          <span className="sr-only">items in cart, view cart</span>
        </a>
      </div>
    </div>
  )
}
