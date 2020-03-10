const path = require('path')
const gm = require('gm')
// const gm = require('gm').subClass({ imageMagick: true })

const koaRouter = require('koa-router')

const arrBuffer = [
  {
    name: 'Darcrand',
    password: '123',
    x: null
  }
]
const router = koaRouter()

router.post('/get-image', async ctx => {
  const {
    width = 300,
    height = 200,
    fragmentSize = 50,
    userName = null
  } = ctx.request.body

  if (!userName) {
    ctx.body = { code: 4001, msg: '用户名不能为空' }
    return
  }

  try {
    // 生成图片
    const filePath = getRandomPath()
    const x =
      (Math.floor(Math.random() * 1000) % (width - 2 * fragmentSize)) +
      fragmentSize
    const y = Math.floor(Math.random() * 1000) % (height - fragmentSize)
    const { image, fragment } = await createImage(
      filePath,
      width,
      height,
      fragmentSize,
      x,
      y
    )
    // 缓存记录
    // 判断是否为同一个用户
    const itemIndex = arrBuffer.findIndex(v => v.name === userName)
    if (itemIndex !== -1) {
      arrBuffer.splice(itemIndex, 1, { name: userName, x })
    } else {
      arrBuffer.push({ name: userName, x })
    }

    ctx.body = { code: 2000, msg: 'ok', data: { image, fragment, y } }
  } catch (err) {
    ctx.body = { code: 5001, msg: '服务器错误:' + err, data: null }
  }
})

router.post('/check', async ctx => {
  const { userName, password, x } = ctx.request.body

  const itemIndex = arrBuffer.findIndex(v => v.name === userName)

  if (itemIndex === -1) {
    ctx.body = { code: 5001, msg: '信息错误,请刷新重试' }
    return
  }

  const isMatch = Math.abs(x - arrBuffer[itemIndex].x) < 5

  if (isMatch) {
    arrBuffer.splice(itemIndex, 1)

    // 应该有验证用户名和密码的逻辑，这里忽略了
    ctx.body = { code: 2000, msg: '验证成功' }
  } else {
    ctx.body = { code: 4002, msg: '验证失败' }
  }
})

// 随机获取图片文件
function getRandomPath() {
  const fileLength = 4
  const index = Math.floor(Math.random() * 1000) % fileLength
  return path.resolve(__dirname, `../static/images/${index}.jpg`)
}

// 生成大图和小图,返回base64
function createImage(filePath, w, h, s, x, y) {
  const res = { image: '', fragment: '' }
  return new Promise((resolve, reject) => {
    const res = { image: '', fragment: '' }
    gm(filePath)
      .resize(w, h, '!') //! 代表强制按指定大小缩放
      .fill('rgba(0,0,0,50%)')

      // 也不知道这个参数是怎么一回事，先这样吧
      .drawRectangle(x, y, x + s - 1, y + s - 1) //绘制一个矩形
      .noProfile() //删除EXIF，ICM等配置文件数据。
      .toBuffer('jpg', (err, buffer) => {
        if (err) {
          reject(err)
        }
        res.image = 'data:image/jpg;base64,' + buffer.toString('base64')

        gm(filePath)
          .resize(w, h, '!')
          .crop(s, s, x, y)
          .noProfile() //删除EXIF，ICM等配置文件数据。
          .toBuffer('jpg', (err, buffer) => {
            if (err) {
              reject(err)
            }
            res.fragment = 'data:image/jpg;base64,' + buffer.toString('base64')

            resolve(res)
          })
      })
  })
}

module.exports = router
