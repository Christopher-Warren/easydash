const S3 = require('aws-sdk/clients/s3')

module.exports = (app) =>
  app.post('/api/image/delete', async (req, res) => {
    const productId = req.headers.productid

    const getProductImagesS3 = async (productId) => {
      const S3URL = 'https://easydashbucket.s3.amazonaws.com/'
      const s3 = new S3({ apiVersion: '2006-03-01', region: 'us-east-2' })
      const data = await s3
        .listObjects({
          Bucket: 'easydashbucket',
          Prefix: `product_photos/${productId}`,
        })
        .promise()
      return data.Contents.map((value) => S3URL + value.Key)
    }

    const test = await getProductImagesS3(productId)
    res.send(test)
  })
