const fs = require('fs')
const S3 = require('aws-sdk/clients/s3') // AWS obtains credentials automatically from env variables
const multer = require('multer')

const Product = require('../models/product')

const upload = multer({ dest: 'tmp/' })

module.exports = (app) =>
  app.post('/upload/image', upload.array('photos', 12), (req, res) => {
    const images = req.files

    if (!req.body.productId) {
      throw new Error('productId is ' + req.body.productId)
    }

    // images.map((image) => {
    //   fs.readFile(image.path, (err, data) => {
    //     if (err) {
    //       console.error(err.message)
    //       return
    //     }
    //     console.log(image)
    //   })
    // })
    res.json({ dang: 'son' })

    // const s3 = new S3({ apiVersion: '2006-03-01' })

    // s3.listBuckets(function (err, data) {
    //   if (err) {
    //     console.log('Error', err)
    //   } else {
    //     console.log('Successfully connected to -', data.Buckets[0].Name)
    //   }
    // })

    // s3.upload(
    //   {
    //     Bucket: 'easydashbucket',
    //     Key: 'newfolder/test2',
    //     Body: 'asd',
    //     ACL: 'public-read',
    //   },
    //   (err, data) => {
    //     if (err) {
    //       console.error(err.message)
    //     }
    //     console.log(data)
    //   },
    // )
  })
