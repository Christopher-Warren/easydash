const fs = require('fs')
const S3 = require('aws-sdk/clients/s3') // AWS obtains credentials automatically from env variables
const multer = require('multer')

const Product = require('../models/product')

const upload = multer({ dest: 'tmp/' })

module.exports = (app) =>
  app.post('/api/image', upload.array('photos', 12), (req, res) => {
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

    const productId = req.headers.productid

    const images = req.files

    if (!productId) {
      throw new Error('productId is ' + req.body.productId)
    }
    console.log(images)

    const imgUrls = []
    const imageNames = []
    let duplicateCount = 1
    images.forEach((image) => {
      if (imageNames.includes(image.originalname)) {
        let newName
        if (image.originalname.endsWith('.png' || '.gif')) {
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

    const uploadedImages = images.map((image, index) => {
      const uploadedImage = fs.readFileSync(image.path)

      return new Promise((resolve, reject) => {
        const s3 = new S3({ apiVersion: '2006-03-01' })
        s3.upload(
          {
            Bucket: 'easydashbucket',
            Key: `product_photos/${productId}/${imageNames[index]}`,
            Body: uploadedImage,
            ACL: 'public-read',
          },
          (err, data) => {
            if (err) {
              console.error(err.message)
              reject(err)
            }
            // update product file url
            resolve(data)
            imgUrls.push(data.Location)
          },
        )
      })
    })
    Promise.all(uploadedImages)
      .then((data) => {
        const mongoImages = Product.findByIdAndUpdate(productId, {
          images: imgUrls,
        })
        return mongoImages
      })
      .then((data) => {
        res.json({ message: 'Image upload success', images: imgUrls })
      })
      .catch((err) => {
        res.json({ error: err })
      })
  })
