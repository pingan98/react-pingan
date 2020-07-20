import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login, mobileLogin } from "@redux/actions/login";

import "./index.less";

// 引入获取验证码的req
import { reqVerifyCode } from '@api/acl/oauth'

const { TabPane } = Tabs;


function LoginForm (props) {
  const [form] = Form.useForm()

  const [isShowDownCount, setIsShowDownCount] = useState(false)
  let [downCount, setDownCount] = useState(5)
  const [activeKey, setActiveKey] = useState('user')

  // 登录按钮，点击事件的使劲吃里函数
  // const onFinish = ({ username, password }) => {
  // this.props.login(username, password).then((token) => {
  //   // 登录成功
  //   // console.log("登陆成功~");
  //   // 持久存储token
  //   localStorage.setItem("user_token", token);
  //   this.props.history.replace("/");
  // });
  // .catch(error => {
  //   notification.error({
  //     message: "登录失败",
  //     description: error
  //   });
  // });
  // };

  const onFinish = () => {
    if (activeKey === 'user') {
      form.validateFields(['username', 'password']).then(res => {
        //console.log(res)
        let { username, password } = res

        props.login(username, password).then(token => {
          // 登陆成功
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    } else {
      // 校验手机号和验证码
      form.validateFields(['phone', 'verify']).then(res => {
        let { phone, verify } = res
        props.mobileLogin(phone, verify).then(token => {
          localStorage.setItem('user-token', token)
          props.history.replace('/')
        })
      })
    }
  }
  // 第二种校验方式
  const validator = (rules, value) => {
    return new Promise((resolve, reject) => {
      console.log(rules, value)
      if (!value) {
        return reject('必填项')
      }
      if (value.length > 17) {
        return reject('最多17个字')
      }
      if (value.length < 4) {
        return reject('最少为4个')
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return reject('只能书写数字，字母，下划线')
      }
      return resolve()
    })
  }
  // 点击获取验证码   触发表单验证
  const getVerifyCode = async () => {
    console.log('获取验证码按钮触发')
    //手动触发表单的校验，只有校验通过，才去执行后续代码
    // 调用form 实例的validateFields 方法
    const res = await form.validateFields(['phone'])
    // 如果验证不成功，后面的就不会执行
    // console.log('验证通过', res)

    // 获取验证码
    await reqVerifyCode(res.phone)

    // 改变按钮状态，显示倒计时
    setIsShowDownCount(true)

    // 定时器
    let timeId = setInterval(() => {
      // 递减
      downCount--

      setDownCount(downCount)
      if (downCount <= 0) {
        // 清除定时器
        clearInterval(timeId)
        // 定时器状态关闭
        setIsShowDownCount(false)
        // 再次赋值给定时器
        setDownCount(5)
      }
    }, 1000)
  }
  // Tab切换触发的回调函数
  const handleTabChange = (activeKey) => {
    console.log(activeKey)
    setActiveKey(activeKey)
  }

  // gitHub 点击事件
  const gitLogin = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=0e7b8d997e31775655e5'
  }
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          onChange={handleTabChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username"
              rules={[
                {
                  required: true,
                  message: '必填项'
                },
                {
                  max: 17,
                  message: '最多为17位'
                },
                {
                  min: 4,
                  message: '最少为4位'
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '只能输入英文，下划线和数字'
                }

              ]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password" rules={[
              { validator: validator }
            ]}>
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '请输入正确的手机号'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码'
                    },
                    {
                      pattern: /^[\d]{6}$/,
                      message: '请输入验证码'
                    }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn"
                  onClick={getVerifyCode}
                  disabled={isShowDownCount}>
                  {isShowDownCount ? `${downCount}秒后获取` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            // htmlType="submit"
            className="login-form-button"
            onClick={onFinish}
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon" onClick={gitLogin} />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );

}

export default withRouter(connect(null, {
  login, mobileLogin
})(LoginForm));
