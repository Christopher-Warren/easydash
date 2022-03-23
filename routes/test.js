const Product = require('../models/product')

const Category = require('../models/category')
const Subcategory = require('../models/subcategory')

module.exports = (app) => {
  app.post('/deleteall', async (req, res) => {
    const deleteProducts = await Product.find().deleteMany()

    const deleteCategories = await Category.find().deleteMany()

    const deleteSubcategories = await Subcategory.find().deleteMany()

    console.log(deleteProducts)

    res.send({
      deleteProducts,
      deleteCategories,
      deleteSubcategories,
    })
  })
}
