const { User } = require('../../models')

const subscription = async (req, res) => {
  const { subscription } = req.body
  const { _id } = req.user

  if (subscription !== 'starter' && subscription !== 'pro' && subscription !== 'business') {
    return res.status(400).json({
      status: 'error',
      code: 400,
      data: null,
      message: 'incorrect subscription status'
    })
  }

  const newUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true, select: '_id email subscription' })

  newUser
    ? res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        resault: newUser
      },
      message: `subscription changed to ${subscription}`
    })
    : res.status(404).json({
      status: 'error',
      code: 404,
      data: null,
      message: 'subscription not changed'
    })
}

module.exports = subscription
