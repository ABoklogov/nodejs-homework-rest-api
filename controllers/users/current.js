const { User } = require('../../models')

const current = async (req, res) => {
  const user = await User.findOne(req.headers.token)
  const { email, subscription } = user

  res.status(200).json({
    status: 'ok',
    code: 200,
    data: {
      email,
      subscription
    }
  })
}

module.exports = current
