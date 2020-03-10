/**
 * @name ImageCode
 * @desc 滑动图片验证码
 * @author darcrand
 * @version 2019-03-15
 *
 * @param {String} imageUrl 底图
 * @param {String} fragmentUrl 小图片
 * @param {Number} width 宽
 * @param {Number} height 高
 * @param {Number} fragmentSize 小图片尺寸
 * @param {Number} y 小图片y
 * @param {Function} onReload 加载和重新加载的回调
 * @param {Function} onMoveEnd 滑动完成之后的回调
 */

import React from 'react'

import './style.less'

class ImageCode extends React.Component {
  //可写可不写

  // static defaultProps = {
  //   imageUrl: '',
  //   fragmentUrl: '',
  //   width: 340,
  //   height: 200,
  //   fragmentSize: 50,
  //   y: 0,
  //   onReload: () => {},
  //   onMoveEnd: x => {}
  // }

  state = {
    oldX: 0,
    currX: 0,
    startX: 0,
    isMovable: false
  }

  componentDidMount() {
    this.props.onReload()
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageUrl !== prevProps.imageUrl) {
      this.setState({ oldX: 0, currX: 0, isMovable: false })
    }
  }

  onReload = () => {
    this.setState({ oldX: 0, currX: 0, startX: 0, isMovable: false })
    this.props.onReload()
  }

  onMoveStart = e => {
    console.log('start:' + e.clientX)
    // console.log(new Date().getTime())
    this.setState({
      timeStart: new Date().getTime()
    })
    this.setState({ isMovable: true, startX: e.clientX })
  }

  onMoving = e => {
    if (!this.state.isMovable) {
      return
    }
    console.log('oldX:' + this.state.oldX)

    const distance = e.clientX - this.state.startX
    let currX = this.state.oldX + distance

    const min = 0
    const max = this.props.width - this.props.fragmentSize
    console.log('currx:' + currX)
    currX = currX < min ? 0 : currX > max ? max : currX

    this.setState({ currX }, function() {
      console.log(this.state)
    })
  }

  onMoveEnd = () => {
    if (!this.state.isMovable) {
      return
    }

    // this.setState({ timeEnd: new Date().getTime() })
    console.log((new Date().getTime() - this.state.timeStart) / 1000)
    //prev 上一个state值
    this.setState(prev => ({ isMovable: false, oldX: prev.currX }))
    this.props.onMoveEnd(this.state.currX)
  }

  render() {
    const { imageUrl, fragmentUrl, width, height, fragmentSize, y } = this.props
    const { currX } = this.state

    return (
      <div className="image-code" style={{ width }}>
        <div
          className="image-code__image"
          style={{ backgroundImage: `url("${imageUrl}")`, height }}
        >
          <i
            className="image-code__fragment"
            style={{
              backgroundImage: `url("${fragmentUrl}")`,
              width: fragmentSize,
              height: fragmentSize,
              left: currX,
              top: y
            }}
          />
        </div>

        <p className="image-code__reload" onClick={this.onReload}>
          <i className="image-code__reload-ico" />
          <span>重新加载</span>
        </p>

        <div
          className="image-code__slide-bar"
          style={{
            height: 0.8 * fragmentSize,
            lineHeight: 0.8 * fragmentSize + 'px'
          }}
          onMouseMove={this.onMoving}
          onMouseUp={this.onMoveEnd}
          onMouseLeave={this.onMoveEnd}
        >
          <span>按住滑块，拖动完成拼图</span>
          <i
            className="image-code__slide-button"
            style={{
              width: fragmentSize,
              height: 0.8 * fragmentSize,
              left: currX
            }}
            onMouseDown={this.onMoveStart}
          />
        </div>
      </div>
    )
  }
}

export { ImageCode }
