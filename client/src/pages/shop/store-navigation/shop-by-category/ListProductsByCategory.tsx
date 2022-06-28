import { Link } from 'react-router-dom'
import { urlFromItemName } from '../../../../utils/urlFromItemName'

export default function ListProductsByCategory({ data }: any) {
  return data.getAllCategories.map((category: any) => {
    return (
      <div key={category._id} className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight  sm:text-4xl">
            {category.name}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {category.products.map((product: any) => (
              <div
                key={product._id}
                className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                  <img
                    src={product.images[0]}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                  />
                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link
                      to={`/categories/${urlFromItemName(
                        product.name,
                        product._id,
                      )}`}
                    >
                      {console.log(urlFromItemName(product.name, product._id))}
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex-1 flex flex-col justify-end">
                    <p className="text-sm italic text-gray-500">
                      {product.subcategory.name}
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  })
}
