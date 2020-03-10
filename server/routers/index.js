const koaRouter = require("koa-router")
const imageCodeRouter = require("./image-code")

const router = koaRouter()

router.use(imageCodeRouter.routes()).use(imageCodeRouter.allowedMethods())

module.exports = router
