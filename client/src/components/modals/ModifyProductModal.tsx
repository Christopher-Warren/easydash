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
import useHasStateChanged from '../../hooks/useHasStateChanged'
import { GET_ALL_CATEGORIES } from '../../graphql/query_vars'
import { MODIFY_PRODUCT } from '../../graphql/mutation_vars'

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
  const [modifyProduct] = useMutation(MODIFY_PRODUCT)

  const [selectedProduct] = products.data.products.filter(
    (val: any, index: any) => val._id === productId,
  )
  // Global state
  const dispatch = useAppDispatch()

  // Form state
  const [name, setName] = useState(selectedProduct.name)
  const [category, setCategory] = useState(selectedProduct.category.name)
  const [subcategory, setSubcategory] = useState(
    selectedProduct.subcategory.name,
  )
  const [description, setDescription] = useState(selectedProduct.description)
  const [price, setPrice] = useState(selectedProduct.price)
  const [stock, setStock] = useState(selectedProduct.stock)

  const [newCategoryInput, setNewCategoryInput] = useState<any>('')
  const [newSubCategoryInput, setNewSubCategoryInput] = useState<any>('')

  const [progress, setProgress] = useState(0)

  const hasChanged = useHasStateChanged([
    name,
    category,
    subcategory,
    description,
    price,
    stock,
  ])

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

  let selectedImgs: any[] = []

  const handleFormSubmit = (e: React.FormEvent) => {
    // • Solve error
    // • handle images
    // • make component for createProduct

    e.preventDefault()
    modifyProduct({
      variables: {
        _id: productId,
        name,
        category: newCategoryInput ? newCategoryInput : category,
        subcategory: newSubCategoryInput ? newSubCategoryInput : subcategory,
        description,
        price,
        stock,
      },
    }).then(async ({ data }) => {
      const formData = new FormData()
      const fileInput = document.getElementById('file_input') as any
      const images = fileInput && Object.values(fileInput.files)

      images.forEach((file: any) => {
        formData.append('photos', file)
      })

      await axios
        .post('/api/image', formData, {
          headers: {
            productid: data.modifyProduct._id,
          },
          onUploadProgress: (prog) => {
            setProgress((prog.loaded / prog.total) * 100)
          },
        })
        .then(async () => {
          if (selectedImgs.length > 0) {
            await axios.post('/api/image/delete', selectedImgs, {
              headers: {
                productid: selectedProduct._id,
              },
            })
          }
        })
        .then(() => {
          dispatch(toggleModal({ value: null }))
          refetch()
          dispatch(addError('Product successfully changed.'))
        })
    })
  }

  return (
    <ModalContainer
      size="max-w-3xl"
      hasChanged={hasChanged}
      opts={closePromptOpts}
    >
      <div className="w-full left-0 z-30 modal-anims  transition-all duration-100">
        <InfoCardLarge
          title={productId ? 'Edit Product' : 'Create a New Product'}
        >
          <form
            id="newProductForm"
            className="grid grid-cols-4  gap-10"
            onSubmit={handleFormSubmit}
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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
                  const closeModal = () => {
                    dispatch(toggleModal({ value: null }))
                  }

                  if (hasChanged) customPrompt(closePromptOpts, closeModal)
                  if (!hasChanged) closeModal()
                }}
              >
                Back
              </SecondaryButton>
              <PrimaryButton padding="px-10 py-2" type="submit">
                Save
              </PrimaryButton>
            </div>
          </form>
        </InfoCardLarge>
      </div>
    </ModalContainer>
  )
}

export default ModifyProductModal
