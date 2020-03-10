/**
 * @name Home
 * @desc
 * @author
 * @version
 */

import React, { Component } from 'react'
import { ImageCode } from '@/components'
import { post } from '@/utils/aixos'

const config = {
  width: 400,
  height: 250,
  fragmentSize: 50
}

class Home extends Component {
  state = { imageUrl: '', fragmentUrl: '', y: 0 }

  checkImage = x => {
    // 检查图片的位置是否正确
    post('http://localhost:8888/check', {
      userName: 'Darcrand',
      password: '123',
      x
    }).then(res => {
      console.log('check', res)
      if (res.code === 2000) {
        console.log('success')
        this.getImage()
      } else {
        console.log('fail', res.msg)
        this.getImage()
      }
    })
  }

  getImage = () => {
    // 请求新的图片
    post('http://localhost:8888/get-image', {
      userName: 'Darcrand',
      ...config
    }).then(res => {
      console.log('get image', res)
      this.setState({
        imageUrl: res.data.image,
        fragmentUrl: res.data.fragment,
        y: res.data.y
      })
    })
  }

  render() {
    return (
      <div>
        <ImageCode
          {...config}
          {...this.state}
          onReload={this.getImage}
          onMoveEnd={this.checkImage}
        />
      </div>
    )
  }
}

export default Home
