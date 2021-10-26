const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api')
const usersRouter = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/v1/users', usersRouter)

app.use('/api/v1/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error', data = null } = err
  res.status(status).json({
    status: 'rejected',
    code: status,
    data,
    message: message
  })
})

module.exports = app
