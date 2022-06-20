import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { GET_FEATURED_PRODUCTS } from '../../../graphql/query_vars'
import { MobileNav } from './MobileNav'
import { RightNav } from './navbar/RightNav'
import { LeftNav } from './navbar/LeftNav'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)

  const {
    data: { getAllCategories },
  } = useQuery(GET_FEATURED_PRODUCTS)

  if (!getAllCategories) return null

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <MobileNav
        open={open}
        setOpen={setOpen}
        getAllCategories={getAllCategories}
      ></MobileNav>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <LeftNav getAllCategories={getAllCategories} setOpen={setOpen} />
              <RightNav />
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
