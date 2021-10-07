const Event = require('../../models/event')
const User = require('../../models/user')
const Product = require('../../models/product')

const Category = require('../../models/category')
const Subcategory = require('../../models/subcategory')

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
    if (!productInput.subcategory) throw new Error('Please enter a Subcategory')
    // Ensure that the input category exists
    const foundCategory = await Category.findOne({
      name: productInput.category,
    })
    if (!foundCategory) throw new Error('Please create a category')

    // If a subcategory was entered, create the subcategory
    // and assign it to the product
    let foundSubcategory
    if (productInput.subcategory) {
      console.log('subcat entered, creating document...')
      foundSubcategory = await Subcategory.findOne({
        name: productInput.subcategory,
      })
      // console.log(foundSubcategory)
      if (!foundSubcategory) {
        console.log('creating subcategory...')
        foundSubcategory = await Subcategory.create({
          name: productInput.subcategory,
          category: foundCategory._id,
        })
      }
    }

    // Create the product, with category _id
    const createdProduct = await Product.create({
      name: productInput.name,
      category: foundCategory._id,
      subcategory: foundSubcategory ? foundSubcategory._id : null,
      description: productInput.description,
      price: productInput.price,
      createdAt: Date.now(),
    })
    const { name, category, description, price, date, _id } = createdProduct

    console.log(productInput.subcategory)
    // Add the product to the category in which it belogs to
    // Add subcategory to the category if exists
    const updateCat = await Category.findByIdAndUpdate(foundCategory._id, {
      products: [...foundCategory.products, _id],
      subcategories: foundCategory.subcategories.includes(foundSubcategory._id)
        ? [...foundCategory.subcategories]
        : [...foundCategory.subcategories, foundSubcategory._id],
    }).populate('products')

    //  • The easiest solution would be to force a user to enter a subcat •

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
      date,
      _id,
      category: updateCat,
      subcategory: updateSubcat,
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
