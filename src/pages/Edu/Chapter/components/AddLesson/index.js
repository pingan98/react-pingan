import React, { Component } from 'react'
// 引入路由
import { Link } from 'react-router-dom'
// 引入antd组件
import { Card, Form, Input, Button, Select, Switch, Upload, message } from 'antd';
// 引入icon图标
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'

// import { connect } from 'react-redux'

import { reqAddLesson } from '@api/edu/lesson'

// 引入样式
import './index.less'

import MyUpload from '../MyUpload'
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

// @connect(state => (
//     { subjectList: state.subjectList }),
//     // { getSubjectList }
// )
class AddLesson extends Component {

    // 点击添加按钮，表单成功后回调函数
    onFinish = async values => {
        // console.log(values)
        // 要发送请求,添加课时
        // 如何获取chapterId
        // console.log(this.props)
        const chapterId = this.props.location.state._id

        const data = {
            ...values,
            chapterId
        }

        await reqAddLesson(data)
        message.success('课时添加成功')
        this.props.history.push('/edu/chapter/list')
    };

    render () {
        return (

            <Card title={
                <>
                    {/* Link路由跳转 */}
                    <Link to='/edu/chapter/list'>
                        <ArrowLeftOutlined />
                    </Link>
                    <span className='lesson-row'>新增课时</span>
                </>
            }>
                <Form
                    {...layout}
                    name="subject"
                    onFinish={this.onFinish}
                    // onFinishFailed={onFinishFailed}
                    initialValues={{
                        // title: '平安',
                        free: true

                    }}
                >
                    <Form.Item
                        label="课时名称"
                        name="title"
                        rules={[{ required: true, message: '请输入课时分类!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="是否免费"
                        name="free"
                        rules={[{ required: true, message: '请选择是否开启!' }]}
                        valuePropName='checked'
                    >

                        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />

                    </Form.Item>


                    <Form.Item
                        label="上传视频"
                        name="video"
                        rules={[{ required: true, message: '请上传视频!' }]}
                    >
                        <MyUpload></MyUpload>

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
export default AddLesson