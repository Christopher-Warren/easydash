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
    const productId = req.body.productId

    const images = req.files

    if (!req.body.productId) {
      throw new Error('productId is ' + req.body.productId)
    }

    const imgUrls = []
    // Handle duplicate file names
    const imageNames = []
    let duplicateCount = 1
    images.forEach((image) => {
      if (imageNames.includes(image.originalname)) {
        let newName
        if (image.originalname.endsWith('.png')) {
          newName =
            image.originalname.slice(0, image.originalname.length - 4) +
            duplicateCount +
            image.originalname.slice(image.originalname.length - 4)
        } else {
          newName =
            image.originalname.slice(0, image.originalname.length - 5) +
            duplicateCount +
            image.originalname.slice(image.originalname.length - 5)
        }
        imageNames.push(newName)
        duplicateCount++
      } else {
        imageNames.push(image.originalname)
      }
    })

    // Read and upload files to S3
    images.forEach((image, index) => {
      fs.readFile(image.path, (err, data) => {
        if (err) {
          console.error(err.message)
          return
        }

        // const s3 = new S3({ apiVersion: '2006-03-01' })
        // s3.upload(
        //   {
        //     Bucket: 'easydashbucket',
        //     Key: `product_photos/${productId}/${imageNames[index]}`,
        //     Body: data,
        //     ACL: 'public-read',
        //   },
        //   async (err, data) => {
        //     if (err) {
        //       console.error(err.message)
        //     }
        //     // update product file url
        //     await Product.findById(productId, (err, doc) => {
        //       console.log(doc)
        //       doc.images = [...doc.images, data.Location]
        //       doc.save()
        //     })
        //   },
        // )
        // Cleanup tmp
        fs.rm(image.path, (err) => {
          if (err) {
            console.error(err.message)
          }
        })
      })
    })

    res.json({ dang: 'son' })
  })
