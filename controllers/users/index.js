const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const subscription = require('./subscription')
const updateAvatar = require('./updateAvatar.js')
const verification = require('./verification')
const reVerification = require('./reVerification')

module.exports = {
  register,
  login,
  logout,
  current,
  subscription,
  updateAvatar,
  verification,
  reVerification
}
