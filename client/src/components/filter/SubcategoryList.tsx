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
      <li key={index}>
        <Checkbox
          type="checkbox"
          name="subcategory option"
          label={i.name}
          value={i.name}
          onChange={handleCategoriesState}
          id={index.toString()}
          checked={subcategoriesState[index] ? true : false}
          className="px-5 py-3"
        ></Checkbox>
      </li>
    )
  })
}
