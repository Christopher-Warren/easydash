const fs = require('fs')
const S3 = require('aws-sdk/clients/s3') // AWS obtains credentials automatically from env variables
const multer = require('multer')

const Product = require('../models/product')

const upload = multer({ dest: 'tmp/' })

module.exports = (app) =>
  app.post('/upload/image', upload.array('photos', 12), (req, res) => {
    /* This route is dependant on including a productId in 
    the body of the request. This must be addressed in
    the front-end api calls.
    
    1) User clicks "Create Product"
    2) User is shown form
    3) onSubmit, the form is sent as graphql 
       request and mongo object is created
    4) Once that request has completed, this route 
       is called with productId in the body 
    5) The image is uploaded to an S3 folder named PRODUCTID
    
    */

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
