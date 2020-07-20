import React, { Component } from 'react'

// 导入antd中栅格布局的组件
import { Row, Col, Statistic, Progress } from 'antd'

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

import Card from '@comps/Card'

import { AreaChart, ColumnChart } from 'bizcharts';



const firstRowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示元素在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}

// 曲线图
const data = [
  { year: '1991', value: 5 },
  { year: '1992', value: 2 },
  { year: '1993', value: 1 },
  { year: '1994', value: 7 },
  { year: '1995', value: 1 },
  { year: '1996', value: 9 },
  { year: '1997', value: 9 },
  { year: '1998', value: 9 },
  { year: '1999', value: 7 },
];

// 柱状图
const clumData = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
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
              <AreaChart
                data={data}
                // title={{
                //   visible: true,
                //   text: '面积图',
                // }}
                xField='year'
                yField='value'
                xAxis={{
                  visible: false,
                }}
                yAxis={{
                  visible: false,
                }}
                smooth={'true'}
                color='black'
                padding='0'
              />
            </Card>

          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title='支付笔数' value={77777} />}
              footer={<span>转化率77%</span>}
            >
              <ColumnChart
                data={clumData}
                // title={{
                //   visible: true,
                //   text: '基础柱状图',
                // }}
                xAxis={{
                  visible: false,
                }}
                yAxis={{
                  visible: false,
                }}
                forceFit
                padding='0'
                color='black'
                xField='type'
                yField='sales'

                meta={{
                  type: {
                    alias: '类别',
                  },
                  sales: {
                    alias: '销售额(万)',
                  },
                }}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={<Statistic title='运营结果' value={99999} prefix={'￥'} />}
              footer={<span>转化率77%</span>}
            >
              {/* card的内容，写在子节点的位置 */}
              <Progress
                //进度条颜色
                // 对象表示渐变色
                // 写一个颜色值的字符串表示单一颜色
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068'
                }}
                // 进度
                percent={77}
                // 闪烁效果
                status='active'
              />
            </Card>
          </Col>
        </Row >



      </div >
    )
  }
}
