import React, { Component } from 'react'
// 引入antd组件
import { Upload, Button, message } from 'antd';
// 引入icon图标
import { UploadOutlined } from '@ant-design/icons'

import { reqQiniuToken } from '@api/edu/lesson'

import * as qiniu from 'qiniu-js'

import { nanoid } from 'nanoid'

const MAX_VIDEO_SIZE = 2 * 1024 * 1024


export default class MyUpload extends Component {
    // 定义构造函数
    // 构造函数只是从缓存中获取数据/定义状态
    constructor() {
        super()
        // 一进来要从缓存中获取有没有token
        const str = localStorage.getItem('upload_token')

        if (str) {
            // 如果是有内容的字符串，说明之前存储过token
            const res = JSON.parse(str)
            this.state = {
                expires: res.expires,
                uploadToken: res.uploadToken
            }
        } else {
            this.state = {
                expires: 0,
                uploadToken: ''
            }
        }
    }

    // 上传视频之前调用
    handleBeforeUpload = (file, fileList) => {
        console.log(file, fileList)
        // 
        return new Promise(async (resolve, reject) => {
            // 判断视频文件
            if (file.size > MAX_VIDEO_SIZE) {
                message.error('视频文件过大(大于2M)),请重新选择')
                reject('视频文件过大(大于2M)),请重新选择')

                return
            }

            if (Date.now() > this.state.expires) {
                const { uploadToken, expires } = await reqQiniuToken()
                this.saveUploadToken(uploadToken, expires)

            }

            resolve(file)
        })

    }

    // 存储uploadToken和过期时间的方法
    saveUploadToken = (uploadToken, expires) => {
        const targetTime = Date.now() + expires * 1000

        expires = targetTime

        const upload_token = JSON.stringify({ uploadToken, expires })

        localStorage.setItem('upload_Token', upload_token)

        // 存储到state里面
        this.setState({
            uploadToken,
            expires
        })

    }



    // 真正上传视频时调用，这个函数会覆盖默认的上传方式
    handleCustomRequest = (value) => {
        // console.log('上传......')
        // console.log(this.state.uploadToken)
        console.log(value)
        const file = value.file
        const key = nanoid(10)
        const token = this.state.uploadToken
        const putExtra = {
            mimeType: 'video/*'
        }
        const config = { region: qiniu.region.z2 }

        const observable = qiniu.upload(file, key, token, putExtra, config)
        // 创建上传过程触发回调函数的对象
        const observer = {
            //上传过程中触发的回调函数
            next (res) {
                console.log(res)
                value.onProgress(res.total)
            },
            //上传失败触发的回调函数

            error (err) {
                console.log(err)
                value.onError(err)
            },
            // 上传成功触发的回调函数
            complete: (res) => {
                console.log(res)
                value.onSuccess(res)
                this.props.onChange('http://qdcdb1qpp.bkt.clouddn.com/' + res.key)

            }
        }
        this.subscription = observable.subscribe(observer)

    }

    componentWillUnmount () {
        this.subscription && this.subscription.unsubscribe()
    }
    render () {
        return (
            <div>
                <Upload
                    beforeUpload={this.handleBeforeUpload}
                    customRequest={this.handleCustomRequest}
                    accept='videp/*'
                >
                    <Button type='danger'>
                        <UploadOutlined /> 上传视频
                        </Button>
                </Upload>
            </div>
        )
    }
}
