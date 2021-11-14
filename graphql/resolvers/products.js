const Product = require('../../models/product')

const Category = require('../../models/category')
const Subcategory = require('../../models/subcategory')

module.exports = {
  products: async () => {
    const products = await Product.find({})
      .populate('category')
      .populate('subcategory')
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
      foundSubcategory = await Subcategory.findOne({
        name: productInput.subcategory,
      })
      // console.log(foundSubcategory)
      if (!foundSubcategory) {
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
