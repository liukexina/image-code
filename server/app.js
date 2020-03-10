const Koa = require("koa")
const cors = require("koa2-cors")
const koaBody = require("koa-body")

const routers = require("./routers/index")
const { serverConfig } = require("./configs")

const app = new Koa()

app.use(cors({ origin: "*" }))
app.use(
    koaBody({
        // 开启文件流识别
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024 // 上传大小限制
        }
    })
)
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(serverConfig)
