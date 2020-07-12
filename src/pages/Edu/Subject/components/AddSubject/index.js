import React, { Component } from 'react'
// 引入路由
import { Link } from 'react-router-dom'
// 引入antd组件
import { Card, Form, Input, Button, Select, message } from 'antd';
// 引入icon图标
import { ArrowLeftOutlined } from '@ant-design/icons'

import { connect } from 'react-redux'

// import { getSubjectList } from '../../redux'

import { reqGetSubjectList, reqAddSecSubjectList } from '@api/edu/subject'

// 引入样式
import './index.less'
// ---Option解构出来
const Option = Select.Option

// 表单布局属性
const layout = {
    // antd把宽度分为24份
    // 表单文字部分
    labelCol: { span: 3 },
    // 表单项部分
    wrapperCol: { span: 7 },
};


// const onFinishFailed = errorInfo => {
//     console.log('Failed:', errorInfo);
// };

@connect(state => (
    { subjectList: state.subjectList }),
    // { getSubjectList }
)
class AddSubject extends Component {
    page = 1
    state = {
        subjectList: {
            total: 0,
            items: []
        }
    }
    async componentDidMount () {
        console.log(this.props)

        // this.props.getSubjectList(1, 10)
        const res = await reqGetSubjectList(this.page++, 10)

        this.setState({
            subjectList: res
        })
    }

    handleloadMore = async () => {
        const res = await reqGetSubjectList(this.page++, 10)
        const newItems = [...this.state.subjectList.items, ...res.items]
        this.setState({
            subjectList: {
                total: res.total,
                items: newItems
            }
        })
    }

    // 点击添加按钮，表单成功后回调函数
    onFinish = async values => {
        console.log('Success:', values);
        try {
            await reqAddSecSubjectList(values.subjectname, values.parentid)
            message.success('数据添加成功')
            this.props.history.push('/edu/subject/list')
        } catch (error) {
            message.error('数据添加失败' + error)
        }


    };

    render () {
        return (

            <Card title={
                <>
                    {/* Link路由跳转 */}
                    <Link to='/edu/subject/list'>
                        <ArrowLeftOutlined />
                    </Link>
                    <span className='subject-arrow'>新增数据</span>
                </>
            }>
                <Form
                    {...layout}
                    name="subject"
                    onFinish={this.onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="课程分类名称"
                        name="subjectname"
                        rules={[{ required: true, message: '请输入课程分类!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="父级分类id"
                        name="parentid"
                        rules={[{ required: true, message: '请选择分类id!' }]}
                    >
                        <Select
                            dropdownRender={menu => {
                                return (
                                    <>
                                        {menu}
                                        {this.state.subjectList.total > this.state.subjectList.items.length
                                            && (<Button type='link' onClick={this.handleloadMore}>
                                                加载更多数据
                                            </Button>)}

                                    </>
                                )
                            }}>

                            <Option value={0} key={0}>
                                {'一级课程分类'}
                            </Option>
                            {this.state.subjectList.items.map(
                                subject => {
                                    return (
                                        <Option value={subject._id} key={subject._id}>

                                            {subject.title}
                                        </Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                    </Form.Item>
                </Form>

            </Card >

        )
    }

}
export default AddSubject