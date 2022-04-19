const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async function isAdmin(req, res, next) {
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
    if (error.message.includes('jwt expired')) {
      req.sessionExpired = true

      // res.clearCookie('token')
    } else {
      console.log('isAdminError', error.message)
    }
  }
  next()
}
