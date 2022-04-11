const Product = require('../../models/product')

const Category = require('../../models/category')
const Subcategory = require('../../models/subcategory')
const normalizeInputs = require('../../utils/normalizeInputs')

const Order = require('../../models/order')

const S3 = require('aws-sdk/clients/s3')
const subcategory = require('../../models/subcategory')

const mongoose = require('mongoose')

module.exports = {
  createOrder: async ({ orderInput }) => {
    let orderNumber = await Order.count()
    orderNumber += 100000

    const { billingInput } = orderInput
    const { shippingInput } = orderInput

    // Prevent orders from being created
    // if qty exceeds items in stock
    for (const item of orderInput.products) {
      const product = await Product.findOne({ _id: item.product })
      if (product.stock < item.qty)
        throw new Error(
          'Selected qty. cannot exceed the amount of items in stock',
        )
    }

    // Initialize order
    const order = await Order.create({
      orderNumber,
      products: orderInput.products,
      status: {
        paid: false,
        processed: false,
        fulfilled: false,
      },
      billingInfo: billingInput,
      shippingInfo: shippingInput,
    })

    // Populate products field so we can access the item prices
    await order.populate({
      path: 'products',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })

    // Generate the sum of each ordered product & qty
    const productSum = order.products.map((obj) => {
      obj.sum = obj.product.price * obj.qty
      return obj
    })
    order.products = productSum

    // Generate the order total
    const total = order.products.reduce((acc, obj) => {
      return acc + obj.sum
    }, 0)
    order.total = total

    // Remove product from stock
    order.products.forEach(async (val) => {
      const product = await Product.findOne({ _id: val.product._id })
      product.stock -= val.qty

      await product.save()
    })

    await order.save()
    await order.populate({
      path: 'products',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })

    return order
  },
  getAllOrders: async ({ input }, { isAdmin }) => {
    if (!isAdmin) throw new Error('You do not have permission')

    const limit = input?.limit ? input.limit : 5
    const skip = input?.skip ? input.skip : 0

    const sort = input?.sort ? input.sort : null
    const order = input?.order ? input.order : 1

    const filter = input?.filter

    const search = input?.search || null

    const stages = [
      {
        $sort: { [sort]: order },
      },
      { $skip: skip },
      { $limit: limit },
      // {
      //   $match: {
      //     'status.paid': true,
      //   },
      // },
    ]

    function generateFilterStages(filter) {
      if (!filter) return
      function parseQueryOperators(filter) {
        filter.forEach((filter) => {
          for (const key of Object.keys(filter.query)) {
            if (key !== 'boolean') {
              if (filter.query[key].length === 0) {
                filter.query = null

                return
              }

              filter.query['$' + key] = filter.query[key]
              delete filter.query[key]
            }

            if (key === 'boolean') {
              filter.query = filter.query[key]
              delete filter.query[key]
            }
          }
        })
      }

      parseQueryOperators(filter)

      filter.forEach((i) => {
        if (!i.query) return
        const filterStage = {
          $match: {
            [i.field]: i.query,
          },
        }

        stages.unshift(filterStage)
      })
    }

    generateFilterStages(filter)

    if (search) {
      stages.unshift({
        $match: {
          orderNumber: parseFloat(search),
        },
      })
    }

    const orders = await Order.aggregate(stages)

    return orders
  },
  orders: async ({ input }, { isAdmin }) => {
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

      // {
      //   $lookup: {
      //     from: 'categories',
      //     localField: 'category',
      //     foreignField: '_id',
      //     as: 'category',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'subcategories',
      //     localField: 'subcategory',
      //     foreignField: '_id',
      //     as: 'subcategory',
      //   },
      // },
      // { $unwind: '$category' },
      // { $unwind: '$subcategory' },
      // {
      //   $match: {
      //     price: { $gte: 60, $lte: 70 },
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

    function generateFilterStages(filter) {
      if (!filter) return
      function parseQueryOperators(filter) {
        filter.forEach((filter) => {
          for (const key of Object.keys(filter.query)) {
            console.log(filter.query[key])
            if (filter.query[key].length === 0) {
              filter.query = null

              return
            }
            filter.query['$' + key] = filter.query[key]
            delete filter.query[key]
          }
        })
      }

      parseQueryOperators(filter)

      filter.forEach((i) => {
        if (!i.query) return
        const filterStage = {
          $match: {
            [i.field]: i.query,
          },
        }

        stages.unshift(filterStage)
      })
    }

    generateFilterStages(filter)

    // unshift lookup operations
    stages.unshift(
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
    )
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
