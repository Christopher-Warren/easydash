import Link from "next/link";

export default function ShopBySubcategory({ data }: any) {
  return (
    <div className="bg-white">
      <div className="max-w-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Shop by Subcategory
        </h2>
        <p className="mt-4 text-base text-gray-500">
          What do you want to see here?
        </p>

        <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {data.getAllSubcategories.map((subcategory: any) => (
            <Link
              key={subcategory.name}
              href={`shop/subcategories/${subcategory.name}`}
              className="group block"
            >
              <div
                aria-hidden="true"
                className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
              >
                <img
                  src={subcategory.products[0].images[0]}
                  alt={"subcategory pic"}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {subcategory.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {subcategory.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
