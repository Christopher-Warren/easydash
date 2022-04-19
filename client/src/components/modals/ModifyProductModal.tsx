import ModalContainer from './ModalContainer'

import { useQuery, gql, useMutation, QueryResult } from '@apollo/client'

import { Fragment, useEffect, useRef, useState } from 'react'

import { toggleModal } from '../../redux/modal/modalSlice'
import { addError } from '../../redux/error/errorSlice'
import { useAppDispatch } from '../../redux/hooks'

import axios from 'axios'
import PrimaryButton from '../buttons/PrimaryButton'

// initial state for images
import img from '../../assets/feather/image.svg'
import SecondaryButton from '../buttons/SecondaryButton'
import SelectPrimary from '../inputs/SelectPrimary'
import TextInput from '../inputs/TextInput'
import TextArea from '../inputs/TextArea'
import InfoCardLarge from '../cards/InfoCardLarge'
import customPrompt from '../../utils/customPrompt'
import Progress from '../progress/Progress'
import usePrompt from '../../hooks/usePrompt'
import { GET_ALL_CATEGORIES } from '../../graphql/query_vars'

type ModifyProductType = {
  productId?: string
  products: QueryResult
  children?: any
}

interface CategoryTypes {
  getAllCategories: any[]
}

type PromptTypes = {
  title: string
  body: string
  confirm: string
  cancel: string
}
const closePromptOpts: PromptTypes = {
  title: 'Are you sure you wish to go back?',
  body: 'All changes will be lost',
  confirm: 'Back',
  cancel: 'Stay',
}

const ModifyProductModal = ({ products, productId }: ModifyProductType) => {
  const { refetch } = products
  const { data } = useQuery<CategoryTypes>(GET_ALL_CATEGORIES)

  const [selectedProduct] = products.data.products.filter(
    (val: any, index: any) => val._id === productId,
  )

  const [selectedCategory, setSelectedCategory] = useState(0)
  const [newCategoryInput, setNewCategoryInput] = useState<any>('')
  const [newSubCategoryInput, setNewSubCategoryInput] = useState<any>('')
  // State for Form Data
  // When a product is selected, state will initialize
  // to its data
  const [name, setName] = useState(selectedProduct.name)
  const [category, setCategory] = useState(selectedProduct.category.name)
  const [subcategory, setSubcategory] = useState(
    selectedProduct.subcategory.name,
  )
  const [description, setDescription] = useState(selectedProduct.description)
  const [price, setPrice] = useState(selectedProduct.price)
  const [stock, setStock] = useState(selectedProduct.stock)

  // State to track upload progress
  const [progress, setProgress] = useState(0)

  const dispatch = useAppDispatch()

  const renderCategoryOptions = () => {
    return data?.getAllCategories.map((category: any, index: number) => {
      return (
        <Fragment key={index}>
          <option className="">{category.name}</option>
        </Fragment>
      )
    })
  }

  const renderSubcategoryOptions = () => {
    const subcategories = data?.getAllCategories.filter(
      (obj) => obj.name === category,
    )[0]?.subcategories

    if (!subcategories) return null

    return subcategories.map((subcategory: any) => {
      return <option key={subcategory._id}>{subcategory.name}</option>
    })
  }

  console.log(category, subcategory)

  return (
    <ModalContainer
      size="max-w-3xl"
      //   hasChanges={hasChanges}
      opts={closePromptOpts}
    >
      <div className="w-full left-0 z-30 modal-anims  transition-all duration-100">
        <InfoCardLarge
          title={productId ? 'Edit Product' : 'Create a New Product'}
        >
          <form
            id="newProductForm"
            className="grid grid-cols-4  gap-10"
            // onSubmit={handleFormSubmit}
          >
            <TextInput
              autoFocus
              placeholder="Name"
              id="name"
              containerClassName="col-span-full"
              // className="col-span-full self-center"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            ></TextInput>

            <div className="md:col-span-2 col-span-full transition-all duration-100">
              <SelectPrimary
                value={category}
                onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                  const defaultSubcategory = data?.getAllCategories.filter(
                    (category) => category.name === e.currentTarget.value,
                  )[0]?.subcategories[0]?.name

                  setCategory(e.currentTarget.value)

                  if (!subcategory && defaultSubcategory) {
                    setSubcategory(defaultSubcategory)
                  }
                  if (!e.currentTarget.value) setSubcategory('')
                }}
                label="Category"
              >
                {renderCategoryOptions()}
                <option value="">New Category</option>
              </SelectPrimary>

              <TextInput
                containerClassName="mt-5"
                placeholder="New category"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.currentTarget.value)}
                disabled={category !== ''}
                required
              ></TextInput>
            </div>

            {/* Subcategory */}
            <div className="  md:col-span-2 col-span-full">
              <SelectPrimary
                value={subcategory}
                onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                  setSubcategory(e.currentTarget.value)
                }}
                label="Subcategory"
              >
                {renderSubcategoryOptions()}
                <option
                  value=""
                  onClick={(e) => setSubcategory(e.currentTarget.value)}
                >
                  New Subcategory
                </option>
              </SelectPrimary>
              <TextInput
                containerClassName="mt-5"
                placeholder="New subcategory"
                value={newSubCategoryInput}
                onChange={(e) => setNewSubCategoryInput(e.currentTarget.value)}
                disabled={subcategory !== ''}
                required
              ></TextInput>
            </div>

            {/* {renderImagePreview()} */}

            <TextInput
              containerClassName="col-span-2 md:col-span-1"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
            ></TextInput>
            <TextInput
              containerClassName="col-span-2 md:col-span-1"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(parseInt(e.currentTarget.value))}
            ></TextInput>
            <TextArea
              placeholder="Description"
              containerClassName="row-span-6 md:col-span-2 col-span-full"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></TextArea>
            <Progress className="col-span-full" progress={progress}></Progress>

            <div className="col-span-full flex justify-between">
              <SecondaryButton
                red
                padding="px-10 py-2"
                onClick={(e: any) => {
                  e.preventDefault()
                  const closeToggle = () => {
                    dispatch(toggleModal({ value: null }))
                  }

                  //   if (hasChanges) customPrompt(closePromptOpts, closeToggle)
                  //   if (!hasChanges) closeToggle()
                }}
              >
                Back
              </SecondaryButton>
              <PrimaryButton padding="px-10 py-2" type="submit">
                {selectedProduct ? 'Save' : 'Create'}
              </PrimaryButton>
            </div>
          </form>
        </InfoCardLarge>
      </div>
    </ModalContainer>
  )
}

export default ModifyProductModal
