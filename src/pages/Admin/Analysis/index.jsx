import React, { Component } from 'react'

// 导入antd中栅格布局的组件
import { Row, Col, Statistic } from 'antd'

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

import Card from '@comps/Card'

const firstRowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示元素在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}


export default class Analysis extends Component {
  render () {
    return (
      <div>
        {/* gutter 表示栅格之间的间隔
          第一个参数: 水平方向  单位是px
          第二个参数: 垂直方向  单位是px
        
        */}
        <Row gutter={[16, 16]}>
          <Col {...firstRowCol}>
            {/*  */}
            <Card
              // Card标题
              title={<Statistic title='总销售额' value={999999999} prefix={'￥'} />}
              footer={<span>日销售额￥99999999</span>}
            >
              {/* card的内容，写在子节点的位置 */}
              <span>周同比  57% <CaretUpOutlined style={{ color: 'red' }} /></span>
              <span>日同比  27% <CaretDownOutlined style={{ color: 'black' }} /></span>
            </Card>
          </Col>
          <Col {...firstRowCol}>
            {/*  */}
            <Card
              // Card标题
              title={<Statistic title='幸运' value={7777777} prefix={'￥'} />}
              footer={<span>幸运数字$777</span>}
            >
              {/* card的内容，写在子节点的位置 */}
              <span>周同比  57% <CaretUpOutlined style={{ color: 'red' }} /></span>
              <span>日同比  27% <CaretDownOutlined style={{ color: 'black' }} /></span>
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card></Card>
          </Col>
          <Col {...firstRowCol}>
            <Card></Card>
          </Col>
        </Row >
      </div >
    )
  }
}
