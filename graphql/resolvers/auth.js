const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email })
      if (existingUser) {
        throw new Error('User already exists.')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      })
      const result = await user.save()
      return { ...result._doc, _id: result.id, password: null }
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
      'iliketoeateateatapplesandbananas',
      { expiresIn: '60s' },
    )

    res.cookie('token', token, { maxAge: 6000, httpOnly: true, sameSite: true })
    // Return has to meet AuthData type
    return { userId: user.id, token: token, tokenExpiration: 1 }
  },
}
