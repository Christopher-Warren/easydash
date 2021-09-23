const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async function isAdmin(req, res, next) {
  // have to include return?
  if (!req.cookies.token) return next()

  try {
    const { email } = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    const user = await User.findOne({ email })

    if (user.role === 'ADMIN') {
      req.isAdmin = true
    } else {
      req.isAdmin = false
    }
  } catch (error) {
    req.isAdmin = false
    throw new Error('dat jwt expired')
  }
  //
  console.log('isAdmin', req.cookies)

  next()
}
