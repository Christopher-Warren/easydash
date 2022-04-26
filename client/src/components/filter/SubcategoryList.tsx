import Checkbox from '../inputs/Checkbox'

export const SubcategoryList = ({
  subcategories,
  subcategoriesState,
  setSubcategoriesState,
}: any) => {
  if (!subcategories) return null
  const handleCategoriesState = (e: any) => {
    const targetIndex = parseFloat(e.currentTarget.id)
    if (
      subcategoriesState.length !== subcategories.getAllSubcategories.length
    ) {
      setSubcategoriesState(
        subcategories.getAllSubcategories.map(
          (category: any, index: number) => {
            if (targetIndex === index) return true
            return false
          },
        ),
      )
    }
    if (
      subcategoriesState.length === subcategories.getAllSubcategories.length
    ) {
      setSubcategoriesState((prev: any) =>
        prev.map((category: any, index: number) => {
          if (targetIndex === index) return !category
          return category
        }),
      )
    }
  }
  return subcategories.getAllSubcategories.map((i: any, index: number) => {
    return (
      <li key={index} className="py-2">
        <Checkbox
          type="checkbox"
          name="subcategory option"
          label={i.name}
          value={i.name}
          onChange={handleCategoriesState}
          id={index.toString()}
          checked={subcategoriesState[index] ? true : false}
          className="lg:w-4 w-5 h-5 lg:h-4 mt-1 accent-purple-500"
        ></Checkbox>
      </li>
    )
  })
}
