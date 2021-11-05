const fs = require('fs/promises')
const path = require('path')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const { User } = require('../../models')

const updateAvatar = async (req, res) => {
  const id = req.user._id.toString()

  const { path: tmpPath, originalname } = req.file
  const uploadPath = path.join(avatarDir, id, originalname)

  try {
    await fs.rename(tmpPath, uploadPath) // перемещаем аватарку из временной папки tmp в папку для аватарки юзера public/avatars/idUser
    const avatarURL = `/avatars/${id}/${originalname}`
    await User.findByIdAndUpdate(id, { avatarURL })

    res.status(200).json({
      status: 'ok',
      code: 200,
      data: {
        avatarURL
      }
    })
  } catch (error) {
    await fs.unlink(tmpPath)

    res.status(401).json({
      status: 'unauthorized',
      code: 401,
      data: {
        message: 'Not authorized'
      }
    })
    throw error
  }
}

module.exports = updateAvatar
