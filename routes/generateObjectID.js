const mongoose = require('mongoose')

module.exports = (app) => {
  app.get('/api/generate_id', async (req, res) => {
    const id = mongoose.Types.ObjectId()
    res.send({ id })
  })
}
