const { User } = require('../../models')

const verification = async (req, res) => {
  const { verificationToken } = req.params

  const user = await User.findOne({ verificationToken })

  if (!user) {
    return res.status(404).json({
      status: 'Not Found',
      code: 404,
      message: 'User not found'
    })
  }

  await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true })
  res.status(200).json({
    status: 'ok',
    code: 200,
    message: 'Verification successful'
  })
}

module.exports = verification
