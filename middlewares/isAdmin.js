const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async function isAdmin(req, res, next) {
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
  }
  next()
}
