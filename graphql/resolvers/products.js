const Product = require('../../models/product')

const Category = require('../../models/category')
const Subcategory = require('../../models/subcategory')
const normalizeInputs = require('../../utils/normalizeInputs')

const S3 = require('aws-sdk/clients/s3')
const subcategory = require('../../models/subcategory')

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
      //     'category.name': { $in: ['food', 'apparel'] },
      //   },
      // },
      // {
      //   $match: {
      //     'subcategory.name': { $in: ['shirt', 'apparel'] },
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
        console.log(filterStage)
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

    // • need to delete modified product ID from old categories and data
    // • need to delete any categories/subcategories that do not have
    //   any products

    normalizeInputs(productInput)
    const { _id: ID } = productInput
    const { name } = productInput
    const { description } = productInput
    const { price } = productInput
    const { stock } = productInput
    const { category: categoryName } = productInput
    const { subcategory: subcategoryName } = productInput

    const modifiedProduct = await Product.findById(ID)

    const oldCategory = await Category.findById(modifiedProduct.category)
    const oldSubcategory = await Subcategory.findById(
      modifiedProduct.subcategory,
    )

    if (name) modifiedProduct.name = name
    if (description) modifiedProduct.description = description
    if (price) modifiedProduct.price = price
    if (stock) modifiedProduct.stock = stock

    // Handle case where:
    // New category is entered
    const existantCategory = await Category.findOne({ name: categoryName })
    const existantSubcategory = await Subcategory.findOne({
      name: subcategoryName,
    })

    if (categoryName && categoryName !== oldCategory.name) {
      // When destination category and subcategory exist,
      // update data, no new categories or subcategories
      // are needed
      if (existantCategory && existantSubcategory) {
        existantCategory.products.push(ID)
        existantSubcategory.products.push(ID)

        modifiedProduct.category = existantCategory._id
        modifiedProduct.subcategory = existantSubcategory._id
      }
      // Destination category exists, but a new subcategory
      // needs to be created
      if (existantCategory && !existantSubcategory) {
        // create new subcategory and update data
        const newSubcategory = await Subcategory.create({
          name: subcategory,
          category: existantCategory._id,
          products: [ID],
        })

        existantCategory.subcategories.push(newSubcategory._id)
        existantCategory.products.push(ID)

        modifiedProduct.subcategory = newSubcategory._id
        modifiedProduct.category = existantCategory._id
      }

      // Case where brand new category is entered
      if (!existantCategory) {
        const newCategory = await Category.create({
          name: categoryName,
          products: [ID],
        })
        const newSubcategory = await Subcategory.create({
          name: subcategoryName,
          products: [ID],
          category: newCategory._id,
        })
        newCategory.subcategories = [newSubcategory._id]

        modifiedProduct.category = newCategory._id
        modifiedProduct.subcategory = newSubcategory._id

        newSubcategory.save()
        newCategory.save()
      }

      // Remove product from old category and subcategory

      oldCategory.products = oldCategory.products.filter(
        (product) => product.toString() !== ID,
      )
      oldSubcategory.products = oldSubcategory.products.filter(
        (product) => product.toString() !== ID,
      )
    }

    if (categoryName === oldCategory.name || !categoryName) {
      if (!subcategory) return

      if (existantSubcategory) {
        modifiedProduct.subcategory = existantSubcategory._id
        existantSubcategory.products.push(ID)
      }
      if (!existantSubcategory) {
        const newSubcategory = await Subcategory.create({
          name: subcategoryName,
          category: modifiedProduct.category,
          products: [ID],
        })
        oldCategory.subcategories.push(newSubcategory._id)
        modifiedProduct.subcategory = newSubcategory._id
      }
      oldSubcategory.products = oldSubcategory.products.filter(
        (product) => product.toString() !== ID,
      )
    }
    existantCategory && existantCategory.save()
    existantSubcategory && existantSubcategory.save()

    oldCategory.save()
    oldSubcategory.save()

    modifiedProduct.save()

    // Remove categories that have no products

    const finalProduct = await Product.findById(ID)
      .populate('category')
      .populate('subcategory')
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
  getAllCategories: async ({ category }) => {
    // Need 2 endpoints 'getAllCategories' and 'getAllSubcategories'
    // whose only purpose is to get and return information, allowing
    // the front end to populate data for filtering

    const categories = await Category.find()
      .populate('products')
      .populate('subcategories')

    return categories
  },
  getAllSubcategories: async ({ category }) => {
    // Need 2 endpoints 'getAllCategories' and 'getAllSubcategories'
    // whose only purpose is to get and return information, allowing
    // the front end to populate data for filtering

    const subcategories = await Subcategory.find().populate('products')

    return subcategories
  },
}
