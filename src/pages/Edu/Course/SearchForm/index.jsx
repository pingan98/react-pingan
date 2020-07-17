import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Cascader, Button, message } from 'antd'

// 导入获取所有讲师的方法
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqALLSubjectList, reqGetSecSubjectList } from '@api/edu/subject'

import { getCourseLimitList } from '../redux'
import { connect } from 'react-redux'
import './index.less'

// 导入国际化包
import { FormattedMessage, useIntl } from 'react-intl'


const { Option } = Select

function SearchForm (props) {

  const intl = useIntl()

  const [form] = Form.useForm()
  // 定义存储讲师列表的状态
  const [teacherList, setTeacherList] = useState([])
  // 定义存储所有一级课程分类的状态
  const [subjectList, setSubjectList] = useState([])

  // 利用useEffect,实现组件挂载获取数据
  useEffect(() => {
    async function fetchData () {
      // 注意: 这样的写法,会导致获取完讲师数据,再请求课程分类.会比较耗时
      // 所以要使用Promise.all来实现
      // const teachers = await reqGetAllTeacherList()
      // const subjectList = await reqALLSubjectList()

      // 等所有请求的数据响应了之后,会拿到对应的数据
      const [teachers, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqALLSubjectList()
      ])
      const options = subjectList.map(subject => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false
        }
      })
      // console.log(res)
      setTeacherList(teachers)
      // setSubjectList(subjectList)
      setSubjectList(options)
    }

    fetchData()
  }, [])

  // const [options, setOptions] = useState([
  //   {
  //     value: 'zhejiang',
  //     label: 'Zhejiang',
  //     isLeaf: false
  //   },
  //   {
  //     value: 'jiangsu',
  //     label: 'Jiangsu',
  //     isLeaf: false
  //   }
  // ])

  // 由于使用了cascader组件,我们需要将subjectList中的数据结构,改成cascader组件要求的数据结构

  // const options = subjectList.map(subject => {
  //   return {
  //     value: subject._id,
  //     label: subject.title,
  //     isLeaf: false // false表示有子数据, true表示没有子数据
  //   }
  // })

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  const loadData = async selectedOptions => {
    // 获取一级课程分类
    const targetOption = selectedOptions[selectedOptions.length - 1]

    // cascader组件底层实现了正在加载，只要给对应奇数的数据添加loading
    // 赋值为true  就会展示正在加载
    targetOption.loading = true

    // 发送异步请求
    let secSubject = await reqGetSecSubjectList(targetOption.value)

    // 由于cascader组件，对渲染的数据，有格式要求，所以必须将耳机分类数据，也进行数据重构
    secSubject = secSubject.items.map(item => {
      return {
        value: item._id,
        label: item.title
      }
    })

    // 小圆圈隐藏
    targetOption.loading = false

    // 判断是否有数据
    if (secSubject.length > 0) {
      // 将二级数据添加给一级属性的children属性
      targetOption.children = secSubject
    }


    // 更新subject
    setSubjectList([...subjectList])


  }

  const resetForm = () => {
    form.resetFields()
  }

  const finish = async value => {
    console.log(value)
    /**
      * subject: (2) ["5ee171adc311f5151c52332a", "5ee17310c311f5151c523334"]
        teacherId: "5ee1ebc844086831e4a48eca"
        title: undefined
        ----------------
        subject: ["5ee172f9c311f5151c523331"]
        teacherId: "5ee1ebc844086831e4a48eca"
        title: undefined
        总结: teacherId和title, 如果选择了,就是具体的值,没选就是undefined
        但是subject不一样
        如果只选了一级课程分类 --> subject数据中一条数据
        如果只选了二级课程分类 --> subject数据中两条数据,第一条是一级,第二条是二级
        如果要请求接口,获取课程列表数据
        subjectId
        subjectParentId
        如果subject数组,只有一条数据
        subjectId就是 subject[0]
        subjectParentId 就是 0 
        如果subject数组,有两条数据
        subjectId 就是 subject[1]
        subjectParentId 就是 subject[0]
      */
    let subjectId
    let subjectParentId

    // 有可能subject没选，就是undefined
    if (value.subject && value.subject.length > 1) {
      // 有一级和二级
      subjectId = value.subject[1]
      subjectParentId = value.subject[0]
    }

    if (value.subject && value.subject.length === 1) {
      // 有一级和二级
      subjectId = value.subject[0]
      subjectParentId = 0
    }
    // 请求数据,获取课程分页数据
    const data = {
      page: 1,
      limit: 5,
      title: value.title,
      teacherId: value.teacherId,
      subjectId,
      subjectParentId
    }

    await props.getCourseLimitList(data)
    // 提示
    message.success('课程获取成功')
  }
  return (
    <Form layout='inline' form={form} onFinish={finish}>
      {/* 原来的写法 */}
      {/* <Form.Item name='title' label='标题'> 
       <Input placeholder='课程标题' style={{ width: 250, marginRight: 20 }} />

      */}
      {/* 国际化写法 */}
      <Form.Item name='title' label={<FormattedMessage id="title" />}>

        <Input placeholder={intl.formatMessage({ id: 'title' })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name='teacherId' label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({ id: 'teacher' })}
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(item => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
          {/* <Option value='lucy1'>Lucy1</Option>
          <Option value='lucy2'>Lucy2</Option>
          <Option value='lucy3'>Lucy3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item name='subject' label={<FormattedMessage id="subject" />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({ id: 'subject' })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ margin: '0 10px 0 30px' }}
        >
          {< FormattedMessage id="searchBtn" />}
        </Button>
        <Button onClick={resetForm}>
          {<FormattedMessage id="resetBtn" />}</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(null, { getCourseLimitList })(SearchForm)