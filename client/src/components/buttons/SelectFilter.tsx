import { gql, useQuery } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import SelectOption from './SelectOption'

const SelectFilter = ({
  options,
  buttonText,
  children,
  padding,
  id,
  className,
  type,
  filter,
  setFilter,
}: any) => {
  const [hide, setHide] = useState(false)

  const { data } = useQuery(gql`
    query getAllCategories {
      getAllCategories {
        name
        _id
        subcategories {
          name
          _id
        }
      }
    }
  `)

  const { data: subcategories } = useQuery(gql`
    query getAllSubcategories {
      getAllSubcategories {
        name
        _id
      }
    }
  `)

  // State for options

  const [categoriesState, setCategoriesState] = useState<any>([])
  const [subcategoriesState, setSubcategoriesState] = useState<any>([])

  const [price, setPrice] = useState({ min: '', max: '' })
  const [stock, setStock] = useState({ min: '', max: '' })

  return (
    <div className="relative">
      <button
        onBlur={(e: any) => {
          if (e.target === e.currentTarget) {
            setHide(true)
          }
        }}
        onClick={(e: any) => {
          e.preventDefault()
          if (e.target === e.currentTarget) {
            setHide(!hide)
          }
        }}
        id={id}
        type={type}
        className={`flex  justify-around font-medium text-md tracking-wide leading-relaxed rounded
        ${padding}
        ${className}
      bg-purple-600 text-white
      hover:bg-purple-700 hover:shadow-md 
        focus:shadow-md focus:outline-purple-500 focus:accent-purple-400
      shadow-purple-500/50 shadow
      transition-color duration-200
      `}
      >
        {buttonText}
      </button>
      <div
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute rounded-sm overflow-hidden shadow-md shadow-gray-900
      dark:bg-gray-600 dark:text-white
    text-black z-40  bg-white
      ${hide && 'h-0 w-0 opacity-0'} `}
      >
        <div className="flex flex-wrap w-min px-3 py-2">
          <h1 className="text-xl text-center text-gray-400 w-full ">Filter</h1>
          <form
            onSubmit={(e: any) => {
              e.preventDefault()

              const categoryFilter: {}[] = []
              const subcategoryFilter: {}[] = []

              const priceFilter: any[] = []
              const stockFilter: {}[] = []

              for (let i = 0; i < e.currentTarget.length; i++) {
                const isChecked = e.currentTarget[i].checked
                const eleName = e.currentTarget[i].name

                if (eleName === 'category option' && isChecked) {
                  categoryFilter.push(e.currentTarget[i].value)
                }
                if (eleName === 'subcategory option' && isChecked) {
                  subcategoryFilter.push(e.currentTarget[i].value)
                }
              }

              setFilter(() => {
                const newFilter = [
                  {
                    field: 'category.name',
                    query: {
                      in: categoryFilter,
                    },
                  },
                  {
                    field: 'subcategory.name',
                    query: {
                      in: subcategoryFilter,
                    },
                  },
                  {
                    field: 'price',
                    query: {
                      gte: 60,
                      lte: 70,
                    },
                  },
                  // {
                  //   field: 'stock',
                  //   query: {
                  //     gte: stockFilter[0],
                  //     lte: stockFilter[1],
                  //   },
                  // },
                ]

                return newFilter
              })
            }}
          >
            <div className="flex justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault()

                  setSubcategoriesState([])
                  setCategoriesState([])
                  setFilter([])
                }}
              >
                Clear
              </button>
              <button type="submit">Apply</button>
            </div>

            <SelectOption
              filter={filter}
              categories={data}
              categoriesState={categoriesState}
              setCategoriesState={setCategoriesState}
              name="category"
            ></SelectOption>
            <SelectOption
              filter={filter}
              data={data}
              name="subcategory"
              subcategories={subcategories}
              subcategoriesState={subcategoriesState}
              setSubcategoriesState={setSubcategoriesState}
            ></SelectOption>

            <SelectOption
              filter={filter}
              data={data}
              price={price}
              setPrice={setPrice}
              name="price"
            ></SelectOption>
            <SelectOption
              filter={filter}
              data={data}
              name="qty."
            ></SelectOption>
          </form>
        </div>

        {/* {renderCategories()} */}
      </div>
    </div>
  )
}

export default SelectFilter
