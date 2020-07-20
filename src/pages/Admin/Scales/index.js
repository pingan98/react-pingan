import React, { Component } from 'react'

import { Card, Button, DatePicker } from 'antd'

import moment from 'moment'

const { RangePicker } = DatePicker

const tabListNoTitle = [
    {
        key: 'scales',
        tab: '销售量',
    },
    {
        key: 'visits',
        tab: '访问量',
    }
];
const contentListNoTitle = {
    scales: <p>销售量</p>,
    visits: <p>访问量......</p>,

};
export default class Scales extends Component {
    state = {
        activeKey: 'scales',

        // 实现按钮高亮
        activeBtn: 'day',

        rangeDate: [moment(), moment()]
    }
    // 日期选择器
    handleBtnClick = activeBtn => () => {
        let rangeDate
        switch (activeBtn) {
            case 'day':
                rangeDate = [moment(), moment()]
                break;
            case 'week':
                rangeDate = [moment(), moment().add(1, 'w')]
                break;

            case 'month':
                rangeDate = [moment(), moment().add(1, 'M')]
                break;

            case 'year':
                rangeDate = [moment(), moment().add(1, 'y')]
                break;



        }

        this.setState({
            activeBtn,
            rangeDate
        })
    }
    // 时间发生变化
    handleChange = (date, dateString) => {
        console.log(date, dateString)
        this.setState({
            rangeDate: date
        })
    }
    render () {
        let { activeBtn, rangeDate } = this.state

        const extra = (

            <>

                <Button type={activeBtn === 'day' ? 'link' : 'text'}
                    onClick={this.handleBtnClick('day')}
                >今日</Button>
                <Button type={activeBtn === 'week' ? 'link' : 'text'}
                    onClick={this.handleBtnClick('week')}

                >本周</Button>
                <Button type={activeBtn === 'month' ? 'link' : 'text'}
                    onClick={this.handleBtnClick('month')}
                >本月</Button>
                <Button type={activeBtn === 'year' ? 'link' : 'text'}
                    onClick={this.handleBtnClick('year')}

                >本年</Button>
                <RangePicker value={rangeDate} onChange={this.handleChange} />
            </>


        )
        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.activeKey}

                    tabBarExtraContent={extra}
                    // 点击触发
                    onTabChange={key => {
                        console.log(key)
                        // this.onTabChange(key, 'noTitleKey');
                        this.setState({
                            activeKey: key
                        })
                    }}
                >
                    {contentListNoTitle[this.state.activeKey]}
                </Card>
            </div >
        )
    }
}
