const jwt = require('jsonwebtoken')

const creationToken = (user) => {
  const payload = {
    id: user._id
  }
  const { SECRET_KEY } = process.env
  const token = jwt.sign(payload, SECRET_KEY)
  return token
}
module.exports = creationToken
