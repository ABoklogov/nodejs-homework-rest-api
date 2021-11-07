const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const extensionList = require('./extensionList')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const { User } = require('../../models')

const updateAvatar = async (req, res) => {
  const id = req.user._id.toString()
  const { path: tmpPath, originalname } = req.file

  try {
    const [extension] = originalname.split('.').reverse() // проверяем формат пришедшего файла
    if (!extensionList.includes(extension)) {
      await fs.unlink(tmpPath)
      return res.status(415).json({
        status: 'error',
        code: 415,
        message: 'File format not supported'
      })
    }
    const uploadPath = path.join(avatarDir, id, originalname)
    const file = await Jimp.read(tmpPath)
    await file.resize(250, 250).write(tmpPath) // изменяем размер полученного файла
    await fs.rename(tmpPath, uploadPath) // перемещаем аватарку из временной папки tmp в папку для аватарки юзера public/avatars/idUser
    const avatarURL = `/avatars/${id}/${originalname}`
    const isUpdateAvatarURL = await User.findByIdAndUpdate(id, { avatarURL })

    isUpdateAvatarURL
      ? res.status(200).json({
        status: 'ok',
        code: 200,
        data: {
          avatarURL
        }
      })
      : res.status(401).json({
        status: 'unauthorized',
        code: 401,
        data: {
          message: 'Not authorized'
        }
      })
  } catch (error) {
    await fs.unlink(tmpPath)
    throw error
  }
}

module.exports = updateAvatar
