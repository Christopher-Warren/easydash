const Event = require('../../models/event')
const User = require('../../models/user')
const Product = require('../../models/product')

const Category = require('../../models/category')

const { transformEvent } = require('./merge')

module.exports = {
  events: async (args, req, args2, args3) => {
    if (req.sessionExpired) {
      throw new Error('Session expired')
    }
    if (!req.isAdmin) {
      throw new Error('Unauthorized')
    }
    try {
      const events = await Event.find()
      return events.map((event) => {
        return transformEvent(event)
      })
    } catch (err) {
      throw err
    }
  },

  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized')
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date().toISOString(),
      creator: '612d3e3906b754852b6c2b80',
    })
    let createdEvent
    try {
      const result = await event.save()

      createdEvent = transformEvent(result)

      const user = await User.findById('612d3e3906b754852b6c2b80')

      if (!user) {
        throw new Error('User does not exist.')
      }
      await user.createdEvents.push(event)

      await user.save()
      return createdEvent
    } catch (err) {
      throw err
    }
  },
  products: async () => {
    const products = await Product.find({}).populate('category')
    console.log(products)
    return products
  },
  createProduct: async ({ productInput }) => {
    // Ensure that the input category exists
    const foundCategory = await Category.findOne({
      name: productInput.category,
    })
    if (!foundCategory) throw new Error('Please create a category')

    // Create the product
    const createdProduct = await Product.create({
      name: productInput.name,
      category: foundCategory._id,
      description: productInput.description,
      price: productInput.price,
      createdAt: Date.now(),
    })

    // Add the product to the category in which it belogs to
    const updateCat = await Category.findByIdAndUpdate(foundCategory._id, {
      products: [...foundCategory.products, createdProduct._id],
    })
    console.log(updateCat)
    const { name, category, description, price, date, _id } = createdProduct

    return {
      name,
      category,
      description,
      price,
      date,
      _id,
    }
  },
  categories: async ({ category }) => {
    let categories
    if (category) {
      categories = await Category.find({ name: category }).populate('products')
    } else {
      categories = await Category.find().populate('products')
    }

    return categories
  },
  createCategory: async ({ name, sub }) => {
    const foundCategory = await Category.findOne({ name })

    console.log(sub)
    if (foundCategory) {
      throw new Error('A category with this name already exists')
    }

    const createdCategory = await Category.create({
      name: name.toLowerCase(),
      Subcategories: {
        name: sub,
      },
    })

    return {
      _id: createdCategory._id,
      name: createdCategory.name,
    }
  },
}
