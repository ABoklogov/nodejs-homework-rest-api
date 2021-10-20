require('dotenv').config()
const app = require('../app')
const mongoose = require('mongoose')

const { DB_HOST } = process.env

const PORT = process.env.PORT || 3000

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
    console.log('Database connection successful')
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
