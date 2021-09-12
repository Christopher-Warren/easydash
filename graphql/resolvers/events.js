const Event = require('../../models/event')
const User = require('../../models/user')

const { transformEvent } = require('./merge')

module.exports = {
  events: async (args, req) => {
    try {
      const events = await Event.find()
      return events.map((event) => {
        return transformEvent(event)
      })
    } catch (err) {
      throw err
    }
  },

  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date().toISOString(),
      creator: '612d3e3906b754852b6c2b80',
    })
    let createdEvent
    try {
      const result = await event.save()

      createdEvent = transformEvent(result)

      const user = await User.findById('612d3e3906b754852b6c2b80')

      if (!user) {
        throw new Error('User does not exist.')
      }
      await user.createdEvents.push(event)

      await user.save()
      return createdEvent
    } catch (err) {
      throw err
    }
  },
}
