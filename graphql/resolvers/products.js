const Product = require('../../models/product')

const Category = require('../../models/category')
const Subcategory = require('../../models/subcategory')

module.exports = {
  products: async (arg1, { isAdmin }) => {
    const products = await Product.find({})
      .populate('category')
      .populate('subcategory')

    return products
  },
  createProduct: async ({ productInput }, { isAdmin }) => {
    if (!isAdmin) throw new Error('You do not have permission')
    if (!productInput.subcategory) throw new Error('Please enter a Subcategory')
    if (productInput.category === 'new-category')
      throw new Error(`Category "new-category" is unavailible`)

    if (productInput.subcategory === 'new-subcategory')
      throw new Error(`Subcategory "new-subcategory" is unavailible`)
    // Ensure that the input category exists
    let foundCategory = await Category.findOne({
      name: productInput.category,
    })

    if (!foundCategory) {
      foundCategory = await Category.create({
        name: productInput.category.toLowerCase(),
      })
    }

    // If a subcategory was entered, create the subcategory
    // and assign it to the product
    let foundSubcategory = await Subcategory.findOne({
      name: productInput.subcategory.toLowerCase(),
    })
    if (!foundSubcategory) {
      foundSubcategory = await Subcategory.create({
        name: productInput.subcategory.toLowerCase(),
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
    console.log('Looking for... ', productInput._id)

    const product = await Product.findById(productInput._id)

    const badId = '61f1cc7d9b487aa2926a9666'

    // If a category is entered, check to see if it already exists
    if (productInput.category) {
      const oldCategory = await Category.findById(product.category)
      const oldSubcategory = await Subcategory.findById(product.subcategory)
      const category = await Category.findOne({ name: productInput.category })

      // const subcategory = await Subcategory.findOne({name: productInput.})

      if (category) {
        // Category exists, add product to data unless
        // the product is a duplicate entry

        // Need to handle Subcategory when this condition is met.
        if (!category.products.includes(productInput._id)) {
          category.products.push(productInput._id)
          category.save()
        }
        // Update Product Category
        product.category = category._id
        product.save()
      } else {
        // Category does not exist, create a new one
        // and add product to it.
        // Since Category is new, a new Subcategory is needed
        if (!productInput.subcategory)
          throw new Error(
            'You must enter a Subcategory when creating a new Category',
          )
        const newCategory = await Category.create({
          name: productInput.category,
          products: [productInput._id],
        })

        const newSubcategory = await Subcategory.create({
          name: productInput.subcategory,
          category: newCategory._id,
          products: [productInput._id],
        })

        newCategory.subcategories = [newSubcategory._id]
        newCategory.save()
        // Update Product Category
        product.category = newCategory._id
        product.subcategory = newSubcategory._id

        product.save()
      }
      const updatedProducts = oldCategory.products.filter(
        (val) => val == product._id,
      )
      // Remove product ID entry from previous category
      oldCategory.products = updatedProducts
      oldSubcategory.products = updatedProducts

      oldCategory.save()
      oldSubcategory.save()
    }

    // category.save()

    const modifiedProduct = await Product.findByIdAndUpdate(
      productInput._id,
      {
        name: productInput?.name,
        price: productInput?.price,
        description: productInput?.description,
        stock: productInput?.stock,
      },
      { returnDocument: 'after' },
    )
      .populate('category')
      .populate('subcategory')

    return modifiedProduct
  },
  deleteProducts: async ({ productIds }, { isAdmin }) => {
    if (!isAdmin) throw new Error('You do not have permission')

    const res = await Product.deleteMany({ _id: { $in: productIds } })

    return res.deletedCount
  },
  categories: async ({ category }) => {
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
