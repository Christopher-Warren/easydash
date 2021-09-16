const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  createUser: async ({ userInput }) => {
    try {
      const existingUser = await User.findOne({ email: userInput.email })
      if (existingUser) {
        throw new Error('User already exists.')
      }
      const hashedPassword = await bcrypt.hash(userInput.password, 12)
      let role
      if (userInput.email === process.env.ADMIN_ROLE) {
        role = 'ADMIN'
      } else {
        role = 'USER'
      }
      const user = new User({
        email: userInput.email,
        password: hashedPassword,
        role: role,
      })
      const result = await user.save()

      return {
        ...result._doc,
        _id: result.id,
        password: null,
        role: role,
      }
    } catch (err) {
      throw err
    }
  },
  login: async ({ email, password }, { res }) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('User does not exist.')

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) throw new Error('Incorrect password.')

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '60s' },
    )

    res.cookie('token', token, {
      maxAge: 60000,
      httpOnly: true,
      sameSite: true,
    })
    return { userId: user.id, email: email, role: user.role }
  },
  validateToken: async (args, req) => {
    if (!req.cookies.token) throw new Error('Session expired: Please log in')

    const { userId, email } = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
    )

    return { userId, email }
  },
  logout: (args, { res }) => {
    res.clearCookie('token')
    return 'asdasd'
  },
}
