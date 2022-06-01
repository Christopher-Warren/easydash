import { useQuery, useMutation, QueryResult } from '@apollo/client'

import { Fragment, useEffect, useState } from 'react'

import { toggleModal } from '../../../redux/modal/modalSlice'
import { addError } from '../../../redux/error/errorSlice'
import { useAppDispatch } from '../../../redux/hooks'

import axios from 'axios'
import PrimaryButton from '../../../components/buttons/PrimaryButton'

import img from '../../../assets/feather/image.svg'
import SecondaryButton from '../../../components/buttons/SecondaryButton'
import SelectPrimary from '../../../components/inputs/SelectPrimary'
import TextInput from '../../../components/inputs/TextInput'
import TextArea from '../../../components/inputs/TextArea'

import customPrompt from '../../../utils/customPrompt'
import Progress from '../../../components/progress/Progress'
import useHasStateChanged from '../../../hooks/useHasStateChanged'
import { GET_ALL_CATEGORIES } from '../../../graphql/query_vars'
import { CREATE_PRODUCT } from '../../../graphql/mutation_vars'

import ItemPageWrapper from '../../../components/layout/ItemPageWrapper'
import useGetId from '../../../hooks/useGetId'

type ModifyProductType = {
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

const NewProduct = ({ products }: ModifyProductType) => {
  const { refetch } = products
  const { data } = useQuery<CategoryTypes>(GET_ALL_CATEGORIES)
  const [createProduct] = useMutation(CREATE_PRODUCT)

  // Global state
  const dispatch = useAppDispatch()

  // Form state
  const [name, setName] = useState('')
  const [category, setCategory] = useState<string>('')
  const [subcategory, setSubcategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  const [newCategoryInput, setNewCategoryInput] = useState<any>('')
  const [newSubCategoryInput, setNewSubCategoryInput] = useState<any>('')

  // State to manage deletion of images
  const [selectedImgs, setSelectedImgs] = useState<any>([])
  // Temp preview image
  const [imgUrls, setImgUrls] = useState<any[]>([])

  const [progress, setProgress] = useState(0)

  const hasChanged = useHasStateChanged([
    name,
    category,
    subcategory,
    description,
    price,
    stock,
  ])

  useEffect(() => {
    if (!data?.getAllCategories[0]) return

    setCategory(data?.getAllCategories[0].name)
    setSubcategory(() => {
      return data?.getAllCategories[0].subcategories[0].name
    })
  }, [data?.getAllCategories])

  // New state
  const id = useGetId()

  const renderCategoryOptions = () => {
    if (!data) return null
    return data.getAllCategories.map((category: any, index: number) => {
      return (
        <Fragment key={index}>
          <option className="">{category.name}</option>
        </Fragment>
      )
    })
  }

  const renderSubcategoryOptions = () => {
    if (!data || !category) return null

    const subcategories = data?.getAllCategories.filter((obj) => {
      console.log(obj.name, category)
      return obj.name === category
    })[0]?.subcategories

    return subcategories.map((subcategory: any) => {
      return <option key={subcategory._id}>{subcategory.name}</option>
    })
  }

  const renderImagePreview = () => {
    if (!imgUrls) return

    const images = imgUrls.map((url, index) => {
      return (
        <Fragment key={index}>
          <img
            className={` h-20 w-20  object-cover ${
              selectedImgs.includes(url) && 'border-red-500 border-8'
            }`}
            onClick={(e) => {
              if (selectedImgs.includes(url)) {
                setSelectedImgs((prev: any) => {
                  return prev.filter((val: any) => val !== url)
                })
              } else {
                setSelectedImgs([...selectedImgs, url])
              }
            }}
            src={url}
            alt="img"
          ></img>
        </Fragment>
      )
    })

    return (
      <div className="md:col-span-2 col-span-full row-span-6 grid grid-cols-12 h-fit">
        <img
          className="col-span-9 w-full h-64 object-cover"
          src={imgUrls[0] || img}
          alt="img"
        ></img>
        <div className="col-span-3 h-64  overflow-y-auto overflow-x-none ">
          {images}
        </div>

        <input
          className="col-span-full my-4 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 w-full 
              file:text-sm file:font-semibold 
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100
              dark:file:bg-purple-600 dark:file:text-purple-50
              "
          id="file_input"
          type="file"
          multiple
          accept=".jpg,.gif,.jpeg,.png"
          onChange={handleFileOnChange}
        ></input>
      </div>
    )
  }

  // Event Handlers
  const handleFileOnChange = (e: any) => {
    const fileInput = document.getElementById('file_input') as any
    const images = fileInput && Object.values(fileInput.files)

    // TODO: Make an area for images selection
    const newImages = images.map((image: any) => {
      return URL.createObjectURL(image)
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createProduct({
      variables: {
        name,
        category: newCategoryInput ? newCategoryInput : category,
        subcategory: newSubCategoryInput ? newSubCategoryInput : subcategory,
        description,
        price: parseFloat(price as any),
        stock,
      },
    })
      .then(async ({ data }) => {
        const formData = new FormData()
        const fileInput = document.getElementById('file_input') as any
        const images = fileInput && Object.values(fileInput.files)

        images.forEach((file: any) => {
          formData.append('photos', file)
        })

        await axios
          .post('/api/image', formData, {
            headers: {
              productid: data.createProduct._id,
            },
            onUploadProgress: (prog) => {
              setProgress((prog.loaded / prog.total) * 100)
            },
          })
          .then(() => {
            dispatch(toggleModal({ value: null }))
            refetch()
            dispatch(addError('Product successfully created.'))
          })
      })
      .catch((error) => {
        // console.error(error.message)
      })
  }

  return (
    <ItemPageWrapper>
      <div className="md:flex my-6 dark:text-gray-100 justify-between">
        <div className="">
          <h1 className="text-4xl my-2 font-medium">New Product</h1>
        </div>
      </div>
      <form
        id="newProductForm"
        className="grid grid-cols-4  gap-10 bg-slate-800 border dark:border-gray-700 p-6 rounded-md"
        onSubmit={handleFormSubmit}
      >
        <TextInput
          autoFocus
          placeholder="Name"
          id="name"
          containerClassName="col-span-full"
          // className="col-span-full self-center"
          value={name}
          onChange={(e: any) => setName(e.currentTarget.value)}
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
          </SelectPrimary>

          <TextInput
            containerClassName="mt-5"
            placeholder="New category"
            value={newCategoryInput}
            onChange={(e: any) => setNewCategoryInput(e.currentTarget.value)}
            disabled={category !== ''}
            required
          ></TextInput>
        </div>

        {/* Subcategory */}
        <div className="  md:col-span-2 col-span-full">
          <SelectPrimary
            value="asd"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSubcategory(e.currentTarget.value)
            }}
            label="Subcategory"
          >
            {renderSubcategoryOptions()}
            {/* <option
              value=""
              onClick={(e) => setSubcategory(e.currentTarget.value)}
            >
              New Subcategory
            </option> */}
          </SelectPrimary>
          <TextInput
            containerClassName="mt-5"
            placeholder="New subcategory"
            value={newSubCategoryInput}
            onChange={(e: any) => setNewSubCategoryInput(e.currentTarget.value)}
            disabled={subcategory !== ''}
            required
          ></TextInput>
        </div>

        {renderImagePreview()}

        <TextInput
          containerClassName="col-span-2 md:col-span-1"
          placeholder="Price"
          value={price}
          onChange={(e: any) => setPrice(e.currentTarget.value)}
        ></TextInput>
        <TextInput
          containerClassName="col-span-2 md:col-span-1"
          placeholder="Stock"
          value={stock}
          onChange={(e: any) => setStock(parseInt(e.currentTarget.value))}
        ></TextInput>
        <TextArea
          placeholder="Description"
          containerClassName="row-span-6 md:col-span-2 col-span-full"
          value={description}
          onChange={(e: any) => setDescription(e.currentTarget.value)}
        ></TextArea>
        <Progress className="col-span-full" progress={progress}></Progress>

        <div className="col-span-full flex flex-row-reverse justify-between">
          <PrimaryButton padding="px-10 py-2" type="submit">
            Create
          </PrimaryButton>
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
        </div>
      </form>
    </ItemPageWrapper>
  )
}

export default NewProduct
