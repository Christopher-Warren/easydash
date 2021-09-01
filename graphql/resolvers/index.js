const User = require('../../models/user')
const bcrypt = require('bcryptjs')

const authResolver = require('./auth')
const eventsResolver = require('./events')
const bookingResolver = require('./booking')

const { dateToString } = require('../../utils/date')
const booking = require('../../models/booking')
const transformEvent = (event) => {
  return {
    ...event._doc,
    creator: user.bind(this, event.creator),
    date: dateToString(event._doc.date),
  }
}
const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
  }
}

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
}

module.exports = rootResolver
