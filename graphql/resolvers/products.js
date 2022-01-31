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
      name: productInput.category.toLowerCase(),
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

    const product = await Product.findById(productInput._id)

    // If a category is entered, check to see if it already exists
    if (productInput.category) {
      const oldCategory = await Category.findById(product.category)
      const oldSubcategory = await Subcategory.findById(product.subcategory)
      const category = await Category.findOne({ name: productInput.category })
      const subcategory = await Subcategory.findOne({
        name: productInput.subcategory,
      })

      if (category) {
        // Category exists, add product to data unless
        // the product is a duplicate entry
        let newSubcategory

        if (!subcategory && productInput.subcategory) {
          newSubcategory = await Subcategory.create({
            name: productInput.subcategory,
            category: category._id,
            products: [productInput._id],
          })
        } else {
          if (!subcategory.products.includes(productInput._id)) {
            subcategory.products.push(productInput._id)
            subcategory.category = category._id
            subcategory.save()
          }
        }

        if (!category.products.includes(productInput._id)) {
          category.products.push(productInput._id)
          category.subcategories.push(
            newSubcategory ? newSubcategory._id : subcategory._id,
          )
          category.save()
        }
        // Update Product Category
        product.category = category._id
        product.subcategory = newSubcategory
          ? newSubcategory._id
          : subcategory._id
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

      // Handle deletion of stale categories and subcategories
      if (oldCategory) {
        const updatedCategoryProducts = oldCategory.products.filter(
          (val) => val == product._id,
        )

        oldCategory.products = updatedCategoryProducts

        oldCategory.save().then(async (data) => {
          const cleanCategory = await Category.deleteMany({ products: [] })
          console.log(cleanCategory)
        })
      }

      const updatedSubategoryProducts = oldSubcategory.products.filter(
        (val) => val == product._id,
      )
      // Remove product ID entry from previous category

      oldSubcategory.products = updatedSubategoryProducts

      oldSubcategory.save().then(async (data) => {
        const cleanSubcategory = await Subcategory.deleteMany({ products: [] })
        console.log(cleanSubcategory)
      })
    }

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

    // const cleanCategory = await Category.deleteMany({ products: [] })
    // const cleanSubcategory = await Subcategory.deleteMany({ products: [] })
    // console.log(cleanCategory)
    // console.log(cleanSubcategory)

    return modifiedProduct
  },
  deleteProducts: async ({ productIds }, { isAdmin }) => {
    if (!isAdmin) throw new Error('You do not have permission')

    const removedProducts = productIds.map(async (productId) => {
      const product = await Product.findOneAndDelete({ _id: productId })

      const category = await Category.findOne({ products: productId })
      const subcategory = await Subcategory.findOne({ products: productId })

      const removedProductsCategoryArr = category.products.filter((val) => {
        return val != productId
      })

      const removedProductsSubcategoryArr = subcategory.products.filter(
        (val) => {
          return val != productId
        },
      )

      category.products = removedProductsCategoryArr
      subcategory.products = removedProductsSubcategoryArr

      category.save()
      subcategory.save()
      deletedCount++
      return product
    })

    return removedProducts.length.toString()
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
