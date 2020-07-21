import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

import { defaultRoutes } from '@conf/routes'

import { connect } from 'react-redux'

import icons from '@conf/icons'

import { Link, withRouter } from 'react-router-dom'

const { SubMenu } = Menu

@withRouter
@connect(state => ({ permissionList: state.user.permissionList }))



class SiderMenu extends Component {
  // 定义一个函数 ，在函数中遍历数组，动态渲染菜单
  // 由于要遍历两个数组，所有这个函数要调用两次
  renderMenu = menus => {
    //遍历传进来的数组
    return menus.map(menu => {
      // 先判断当前这个菜单是否要展示，判断依据就是menu中的hidden属性的值， 
      // true 不展示，false展示
      if (menu.hidden) return

      const Icon = icons[menu.icon]

      if (menu.children && menu.children.length) {
        // 表示有二级菜单
        return (
          <SubMenu key={menu.path} icon={<Icon />} title={menu.name} >
            {menu.children.map(secMenu => {
              if (secMenu.hidden) return
              return <Menu.Item key={menu.path + secMenu.path}>
                {/* {secMenu.name} */}
                <Link to={menu.path + secMenu.path}>{secMenu.name}</Link>
              </Menu.Item>
            })}

          </SubMenu>

        )
      } else {
        // 只有一级菜单
        return (
          <Menu.Item key={menu.path} icon={<Icon />}>
            {/* {menu.name} */}
            {menu.path === '/' ? <Link to='/'>{menu.name}</Link> : menu.nume}
          </Menu.Item>
        )
      }

    })
  }
  render () {
    // console.log(this.props)

    const path = this.props.location.pathname

    const reg = /[/][\w]*/  //正则提取一级菜单路径的正则
    //调用字符串的match 方法   得到一个数组，从数组的第0项 拿到一级菜单路径
    const firstPath = path.match(reg)[0]

    {/* 在 SiderMenu里面要遍历两个数组 */ }
    // 1：config/routes.js/defaultRoutes  ====>登录之后的首页
    // 2：redux中的permissionList   ===>权限管理，教育管理，个人管理
    return (
      <div>
        <Menu theme='dark'
          defaultSelectedKeys={[path]}
          defaultOpenKeys={[firstPath]}
          mode='inline'>

          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}

          {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
            Option 1
                        </Menu.Item>
          <Menu.Item key='2' icon={<DesktopOutlined />}>
            Option 2
                        </Menu.Item>
          <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<FileOutlined />} /> */}
        </Menu>
      </div>
    )
  }
}
export default SiderMenu