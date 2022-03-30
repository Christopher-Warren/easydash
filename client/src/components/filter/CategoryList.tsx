export const CategoryList = ({
  categories,
  categoriesState,
  setCategoriesState,
}: any) => {
  if (!categories) return null
  const handleCategoriesState = (e: any) => {
    const targetIndex = parseFloat(e.currentTarget.id)
    if (categoriesState.length !== categories.getAllCategories.length) {
      setCategoriesState(
        categories.getAllCategories.map((category: any, index: number) => {
          if (targetIndex === index) return true
          return false
        }),
      )
    }
    if (categoriesState.length === categories.getAllCategories.length) {
      setCategoriesState((prev: any) =>
        prev.map((category: any, index: number) => {
          if (targetIndex === index) return !category
          return category
        }),
      )
    }
  }

  return categories.getAllCategories.map((i: any, index: number) => {
    return (
      <li key={index} className="py-2">
        <input
          type="checkbox"
          name="category option"
          value={i.name}
          onChange={handleCategoriesState}
          id={index.toString()}
          checked={categoriesState[index] ? true : false}
          className="lg:w-4 w-5 h-5 lg:h-4 mt-1 accent-purple-500"
        ></input>
        <label htmlFor={index.toString()}>{i.name}</label>
      </li>
    )
  })
}
