import { ReactNode } from 'react'

export interface ProductsData {
  children: ReactNode[] | ReactNode
}

export interface FeaturedCategoryProps {
  getAllCategories: any[]
}

export interface FeaturedCategoryData {
  data?: FeaturedCategoryProps
}
