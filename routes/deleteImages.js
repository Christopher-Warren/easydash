const S3 = require('aws-sdk/clients/s3')
const Product = require('../models/product')

module.exports = (app) =>
  app.post('/api/image/delete', async (req, res) => {
    const productId = req.headers.productid
    if (!productId) throw new Error('Product not specified.')

    if (!req.isAdmin) throw new Error('You do not have permission.')

    const S3URL = 'https://easydashbucket.s3.amazonaws.com/'
    const s3 = new S3({ apiVersion: '2006-03-01', region: 'us-east-2' })

    const imgKeys = req.body.map((img) => {
      const parsekey = img.split('/')
      const key = parsekey[parsekey.length - 1]
      return { Key: `product_photos/${productId}/${key}` }
    })

    const deletedImages = await s3
      .deleteObjects({
        Bucket: 'easydashbucket',
        Delete: { Objects: imgKeys },
      })
      .promise()
      .then(async () => {
        const product = await Product.findByIdAndUpdate(
          productId,
          {
            $pull: { images: { $in: req.body } },
          },
          { new: true },
        )
        return product
      })

    res.send(deletedImages.images)
  })
