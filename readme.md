## 滑动图片验证码

> 基于 react 和 koa2 的一个图片滑动验证码

### 使用

```
git clone https://gitee.com/darcrandex/image-code.git
```

```
// 前端
cd image-code/client
npm i
npm start
```

```
// 后端
cd image-code/server
npm i
npm start
```

### 业务逻辑

1. 前端请求数据
2. 后台返回主图片，和小滑块图片
3. 前端交互，滑动之后，获取滑动的 x 值
4. 将用户信息和 x 传给后台
5. 后台判断是否正确，返回信息给前端

### 后端

这里主要是图片处理的问题，尝试过`node-canvas`,`node-images`,`node-sharp`。但是都存在安装不了或者需要安装很麻烦的依赖库的问题。最后选择`node-gm`。基本上可以满足需求。

不过还是需要安装一个依赖库，[GraphicsMagick](http://www.graphicsmagick.org/)或者[ImageMagick](http://www.imagemagick.org/)。推荐是`GraphicsMagick`，但其实`ImageMagick`也够用了。

关于安装`ImageMagick`。我的环境是`windows`，除了安装软件之外，还需要配置`windows 环境变量`。网上查一下好了。

### 前端

前端部分没有什么大的问题。只有[axios](https://github.com/axios/axios)需要配置一下(/src/utils/axios.js)，主要是跨越的问题。如果不使用`axios`，就根据情况解决跨域就可以了。
