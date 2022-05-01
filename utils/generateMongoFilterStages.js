const { DateTime } = require('luxon')

module.exports = function generateFilterStages(filter, stages) {
  if (!filter) return

  // Each index contains an object with one field:string and a query:object.
  // Here, we get each filter object, and loop through it's queries
  // Typically nested loops should be avoided, but s
  filter.forEach((filter) => {
    for (const key of Object.keys(filter.query)) {
      if (filter.query[key].length === 0) {
        filter.query = null
        return
      }
      const isBoolean =
        filter.query[key] === 'true' || filter.query[key] === 'false'

      if (isBoolean) {
        // We're taking in strings for $eq operations
        // if checking a bool, convert string to bool
        filter.query[key] = JSON.parse(filter.query[key])
      }

      // By default, GraphQL uses seconds internally, so
      // we will need to send all dates as millis on the
      // front end, and parse it here.
      if (filter.field === 'createdAt') {
        filter.query[key] = DateTime.fromMillis(filter.query[key])
      }

      // Append $ to key, delete old key
      filter.query['$' + key] = filter.query[key]
      delete filter.query[key]
    }
  })

  console.log(filter[0].query)

  // Prepares filters for aggregation
  filter.forEach((i) => {
    if (!i.query) return
    const filterStage = {
      $match: {
        [i.field]: i.query,
      },
    }

    stages.unshift(filterStage)
  })
}
