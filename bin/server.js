require('dotenv').config()
const app = require('../app')
const mongoose = require('mongoose')

const { DB_HOST, PORT = 3000 } = process.env

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
    console.log(err.message)
    process.exit(1)
  })
