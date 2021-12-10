import { useQuery, gql } from '@apollo/client'

import PageWrapper from '../../components/PageWrapper'
import InfoCard from '../../components/InfoCard'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'

const Products = ({ userId }: any) => {
  const { data, loading, error } = useQuery(gql`
    query getCategories {
      products {
        name
        category {
          name
        }
        subcategory {
          name
        }
      }
    }
  `)

  return (
    <PageWrapper>
      <h1 className="text-4xl text-gray-700 font-medium">Products</h1>
      <span className="text-gray-600 tracking-wider">
        These are products that you currently have listed for sale
      </span>
      <div className="flex my-5">
        <PrimaryButton className="px-5 py-1.5 mr-5">NEW PRODUCT</PrimaryButton>
        <SecondaryButton className="px-5 py-1.5">NEW CATEGORY</SecondaryButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-5 text-gray-800">
        <div className="col-span-12">
          <InfoCard>
            <h1 className="text-xl relative">All Products</h1>
            {!loading &&
              !error &&
              data.products.map((item: any) => {
                return (
                  <div className="p-2 hover:bg-blue-500">
                    <div className="border-b border-gray-200 w-full absolute left-0" />
                    <div>
                      <h2 className="text-lg leading-none">{item.name}</h2>

                      <div className="text-sm ">{item.category.name}</div>
                      <div className="text-sm ">{item.subcategory.name}</div>
                    </div>

                    <div className=" border-t border-gray-200 w-full absolute left-0" />
                  </div>
                )
              })}
          </InfoCard>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Products
