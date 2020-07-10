const express = require('express')

const app = express()

const Mock = require('mockjs')

const Random = Mock.Random

Random.ctitle()

// 解决跨行
// use是express中的一个中间件
app.use((req, res, next) => {
    //设置响应头
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', 'content-type,token')
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    //调用下一个中间件
    next()
})

// 模拟请求
app.get('/admin/edu/subject/:page/:limit', (req, res) => {

    const { page, limit } = req.params

    const data = Mock.mock({
        total: Random.integer(+limit + 2, limit * 2),

        [`items|${limit}`]: [
            {
                '_id|+1': 1,
                title: '@ctitle(2,7)',
                parentId: 0
            }
        ]
    })

    res.json({
        code: 20000,
        success: true,
        data,
        message: ''
    })
})

app.listen(7777, err => {
    if (err) {
        console.log('服务启动失败', err)
    }
    console.log('服务启动成功---端口号7777')
})