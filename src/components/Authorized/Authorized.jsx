import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserInfo, getUserMenu } from './redux'

import Loading from '@comps/Loading'

@connect(null, { getUserInfo, getUserMenu })

class Authorized extends Component {
  state = {
    loading: true
  }

  // 页面挂载发送请求获取数据
  async componentDidMount () {
    // 一条条获取太慢
    // this.props.getUserInfo()
    // this.props.getUserMenu()
    let { getUserInfo, getUserMenu } = this.props

    await Promise.all([getUserInfo(), getUserMenu()])
    this.setState({
      loading: false
    })
  }

  render () {
    let { loading } = this.state
    return loading ? <Loading></Loading> : this.props.render()
  }
}
export default Authorized