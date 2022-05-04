const Product = require('../../models/product')

const generateMongoFilterStages = require('../../utils/generateMongoFilterStages')

const Order = require('../../models/order')

const { DateTime } = require('luxon')
const now = DateTime.now()
const later = DateTime.local(2022, 10, 12)

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
      createdAt: Date.now(),
      products: orderInput.products,
      status: {
        processed: false,
        paid: false,
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
  getOrder: async ({ input }) => {
    const order = await Order.findById(input).populate({
      path: 'products',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })

    return order.populate('products')
  },
  getAllOrders: async ({ input }, { isAdmin, sessionExpired, isUser }) => {
    if (sessionExpired) throw new Error('Session expired')

    if (!isAdmin && !isUser) throw new Error('Easydash runs in read only mode')

    const limit = input?.limit ? input.limit : null
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

      // {
      //   $match: {
      //     'status.paid': true,
      //   },
      // },
    ]

    if (limit) stages.push({ $limit: limit })

    generateMongoFilterStages(filter, stages)

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
}
