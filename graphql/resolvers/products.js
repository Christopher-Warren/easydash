const Product = require('../../models/product')

const Category = require('../../models/category')
const Subcategory = require('../../models/subcategory')
const normalizeInputs = require('../../utils/normalizeInputs')

const S3 = require('aws-sdk/clients/s3')

module.exports = {
  products: async ({ input }, { isAdmin }) => {
    const limit = input?.limit ? input.limit : 5
    const skip = input?.skip ? input.skip : 0

    const sort = input?.sort ? input.sort : null
    const order = input?.order ? input.order : 1

    const search = input?.search || null

    const filter = input?.filter

    const stages = [
      // {localField} should be a field from this Product Model
      // {foreignField} should be a field on the {from} collection
      // {as} specifies where the found data should be temporarily inserted

      // {$lookup} expects that {localField} and {foreignField} are an exact match

      // {$unwind} takes the data up by one level, removing the enclosing []

      // In order to sort product.category.name, "category.name" is to be
      // the expected sort value.

      // Can filter by
      // • Category
      // • Subcategory
      // • X stock
      // • X price

      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: 'subcategory',
          foreignField: '_id',
          as: 'subcategory',
        },
      },
      { $unwind: '$category' },
      { $unwind: '$subcategory' },
      // {
      //   $match: {
      //     price: { $gte: 10, $lte: 20 },
      //   },
      // },
      // {
      //   $match: {
      //     'category.name': { $eq: 'zebra' },
      //   },
      // },
      {
        $sort: { [sort]: order },
      },
      { $skip: skip },
      { $limit: limit },
    ]

    // if (input.filter) {
    //   const filterStage = {
    //     $match: {
    //       [input.filter.field]: input.filter.query,
    //     },
    //   }

    //   stages.push(filterStage)
    // }

    function generateFilterStages(filter) {
      if (!filter) return
      function parseQueryOperators(filter) {
        filter.forEach((filter) => {
          for (const key of Object.keys(filter.query)) {
            filter.query['$' + key] = filter.query[key]
            delete filter.query[key]
          }
        })
      }

      parseQueryOperators(filter)

      filter.forEach((i) => {
        const filterStage = {
          $match: {
            [i.field]: i.query,
          },
        }

        stages.push(filterStage)
      })
    }

    generateFilterStages(filter)

    if (search) {
      stages.unshift({
        $search: {
          text: {
            path: 'name',
            query: search,
            fuzzy: {},
          },
        },
      })

      stages.push({
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          subcategory: 1,
          description: 1,
          stock: 1,
          price: 1,
          images: 1,
          searchScore: { $meta: 'searchScore' },
        },
      })
    }

    const products = await Product.aggregate(stages)

    return products
  },
  createProduct: async ({ productInput }, { isAdmin }) => {
    if (!isAdmin) throw new Error('You do not have permission')
    if (!productInput.subcategory) throw new Error('Please enter a Subcategory')
    if (productInput.category === 'new-category')
      throw new Error(`Category "new-category" is unavailible`)

    if (productInput.subcategory === 'new-subcategory')
      throw new Error(`Subcategory "new-subcategory" is unavailible`)

    normalizeInputs(productInput)

    // Ensure that the input category exists
    let foundCategory = await Category.findOne({
      name: productInput.category,
    })

    if (!foundCategory) {
      foundCategory = await Category.create({
        name: productInput.category,
      })
    }

    // If a subcategory was entered, create the subcategory
    // and assign it to the product
    let foundSubcategory = await Subcategory.findOne({
      name: productInput.subcategory,
    })
    if (!foundSubcategory) {
      foundSubcategory = await Subcategory.create({
        name: productInput.subcategory,
        category: foundCategory._id,
      })
    }

    // Create the product, with category _id
    const createdProduct = await Product.create({
      name: productInput.name,
      category: foundCategory._id,
      subcategory: foundSubcategory._id,
      description: productInput.description,
      price: productInput.price,
      stock: productInput.stock,
      createdAt: Date.now(),
    })
    const {
      name,
      category,
      description,
      price,
      stock,
      date,
      _id,
    } = createdProduct

    // Add the product to the category in which it belogs to
    // Add subcategory to the category if exists
    const updateCat = await Category.findByIdAndUpdate(foundCategory._id, {
      products: [...foundCategory.products, _id],
      subcategories: foundCategory.subcategories.includes(foundSubcategory._id)
        ? [...foundCategory.subcategories]
        : [...foundCategory.subcategories, foundSubcategory._id],
    }).populate('products')

    const updateSubcat = await Subcategory.findByIdAndUpdate(
      foundSubcategory._id,
      {
        products: [...foundSubcategory.products, _id],
      },
    ).populate('products')

    return {
      name,
      category,
      description,
      price,
      stock,
      date,
      _id,
      category: updateCat,
      subcategory: updateSubcat,
    }
  },
  modifyProduct: async ({ productInput }, { isAdmin }) => {
    if (!isAdmin) throw new Error('You do not have permission')

    if (!productInput.subcategory && productInput.category)
      throw new Error('Must enter a subcategory when changing category.')

    if (productInput.category === 'new-category')
      throw new Error(`Category "new-category" is unavailible`)

    if (productInput.subcategory === 'new-subcategory')
      throw new Error(`Subcategory "new-subcategory" is unavailible`)

    normalizeInputs(productInput)

    const product = await Product.findById(productInput._id)
    const categoryInput = await Category.findOne({
      name: productInput.category,
    })
    const subcategoryInput = await Subcategory.findOne({
      name: productInput.subcategory,
    })
    let newCategoryID
    let newSubcategoryID

    if (categoryInput?.id != product.category && productInput.category) {
      //remove product from categpry and save
      if (categoryInput) {
        newCategoryID = categoryInput._id
      } else {
        const newCat = await Category.create({
          name: productInput.category,
          subcategories: [],
          products: [],
        })
        newCategoryID = newCat._id
      }
    }

    if (
      subcategoryInput?.id != product.subcategory &&
      productInput.subcategory
    ) {
      const subcategoryExists = categoryInput?.subcategories.includes(
        subcategoryInput?.id,
      )

      if (subcategoryInput && subcategoryExists) {
        newSubcategoryID = subcategoryInput._id
      } else {
        // when creating new subcategory, initialize it with a category

        const newSub = await Subcategory.create({
          name: productInput.subcategory,
          category: categoryInput ? categoryInput._id : product._id,
          products: [],
        })
        newSubcategoryID = newSub._id
      }
    }
    // Add subcategory to new category
    const updatedCategory = await Category.findById(newCategoryID)
    const updatedSubcategory = await Subcategory.findById(newSubcategoryID)

    if (updatedCategory) {
      if (!updatedCategory.subcategories.includes(newSubcategoryID)) {
        updatedCategory.subcategories.push(newSubcategoryID)
      }
      if (!updatedCategory.products.includes(product._id)) {
        updatedCategory.products.push(product._id)
      }
      // Remove product from previous category
      const previousCategory = await Category.findById(product.category)
      previousCategory.products = previousCategory.products.filter((item) => {
        item != product.id
      })

      await previousCategory.save()

      product.category = updatedCategory._id

      await updatedCategory.save()
    }

    // Assign category to subcategory & assign product to subcategory
    if (updatedSubcategory) {
      if (!updatedSubcategory.products.includes(product._id)) {
        updatedSubcategory.products.push(product._id)
      }

      // remove product from previous subcategory
      const previousSubcategory = await Subcategory.findById(
        product.subcategory,
      )
      previousSubcategory.products = previousSubcategory.products.filter(
        (item) => {
          item != product.id
        },
      )

      await previousSubcategory.save()

      product.subcategory = updatedSubcategory._id

      await updatedSubcategory.save()
    }
    product.name = productInput?.name
    product.price = productInput?.price
    product.description = productInput?.description

    await product.save()

    const finalProduct = await Product.findById(productInput._id)
      .populate('category')
      .populate('subcategory')

    // Delete any Category/Subcategory that has no products
    const categoryCleanup = await Category.findOneAndDelete({ products: [] })
    const subcategoryCleanup = await Subcategory.findOneAndDelete({
      products: [],
    })

    return finalProduct
  },
  deleteProducts: async ({ productIds }, { isAdmin }) => {
    if (!isAdmin) throw new Error('You do not have permission')
    const s3 = new S3({ apiVersion: '2006-03-01', region: 'us-east-2' })

    let deletedCount = 0
    const removedProducts = productIds.map(async (productId) => {
      const product = await Product.findOneAndDelete({ _id: productId })

      const data = await s3
        .listObjects({
          Bucket: 'easydashbucket',
          Prefix: `product_photos/${productId}`,
        })
        .promise()

      const imageKeys = data.Contents.map((val) => {
        return { Key: val.Key }
      })

      let deletedImages
      if (imageKeys.length > 0) {
        deletedImages = await s3
          .deleteObjects({
            Bucket: 'easydashbucket',
            Delete: { Objects: imageKeys },
          })
          .promise()
      }

      deletedCount++

      return product
    })

    const removedCategoryProducts = await Category.updateMany(
      { products: { $in: productIds } },
      { $pull: { products: { $in: productIds } } },
    )
    const removedSubcategoryProducts = await Subcategory.updateMany(
      { products: { $in: productIds } },
      { $pull: { products: { $in: productIds } } },
    )

    const oldcat = await Category.deleteMany({ products: [] })
    const oldsub = await Subcategory.deleteMany({ products: [] })

    return removedProducts.length.toString()
  },
  categories: async ({ category }) => {
    // Need 2 endpoints 'getAllCategories' and 'getAllSubcategories'
    // whose only purpose is to get and return information, allowing
    // the front end to populate data for filtering
    let categories
    if (category) {
      categories = await Category.find({ name: category })
        .populate('products')
        .populate('subcategories')
    } else {
      categories = await Category.find()
        .populate('products')
        .populate('subcategories')
    }
    return categories
  },

  createCategory: async ({ name }) => {
    const foundCategory = await Category.findOne({ name })

    if (foundCategory) {
      throw new Error('A category with this name already exists')
    }

    const createdCategory = await Category.create({
      name: name.toLowerCase(),
    })

    return {
      _id: createdCategory._id,
      name: createdCategory.name,
    }
  },
}
