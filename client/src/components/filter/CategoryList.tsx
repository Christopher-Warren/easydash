import { useEffect, useState } from 'react'
import Checkbox from '../inputs/Checkbox'

export const CategoryList = ({
  categories,
  categoriesState,
  setCategoriesState,
}: any) => {
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
  if (!categories) return null
  return categories.getAllCategories.map((i: any, index: number) => {
    return (
      <li key={index} className="">
        <Checkbox
          type="checkbox"
          name="category option"
          label={i.name}
          value={i.name}
          onChange={handleCategoriesState}
          id={index.toString()}
          checked={categoriesState[index] ? true : false}
          className="px-5 py-3"
        ></Checkbox>
      </li>
    )
  })
}
