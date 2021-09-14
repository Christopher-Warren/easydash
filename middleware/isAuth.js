const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log('asdasd')
  console.log(req.cookies.token)

  let decodedToken
  try {
    decodedToken = jwt.verify(
      req.cookies.token,
      'iliketoeateateatapplesandbananas',
    )
    console.log('token', decodedToken)
  } catch (err) {
    req.isAuth = false

    return next()
  }
  if (!decodedToken) {
    req.isAuth = false

    return next()
  }

  req.isAuth = true
  req.userId = decodedToken.userId

  next()
}
