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
      // Check whitelist to assign user role
      // then save the role in our db
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
      { expiresIn: '7d' },
    )
    // We can set a maxAge to infinite, and trigger session expired
    // err based off jwt verify.
    res.cookie('token', token, {
      // Expires after 7 days
      maxAge: 60000 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    })
    return { userId: user.id, email: email, role: user.role }
  },
  logout: (args, { res }) => {
    res.clearCookie('token')
    // On frontend we need to remove 'user' localstorage item,
    // and update isLoggedInVar

    return { message: 'You have logged out successfully' }
  },
}
