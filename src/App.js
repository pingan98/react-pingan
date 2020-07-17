import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

// 导入国际化包
import { IntlProvider } from 'react-intl'

import { zh, en } from './locales'

// 导入PubSub
import PubSub from 'pubsub-js'
// 导入antd
import { ConfigProvider } from 'antd'

import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
function App () {
  const [locale, setLocale] = useState('zh')
  useEffect(() => {
    PubSub.subscribe('LANGUAGE', (message, data) => {
      console.log(data)
      setLocale(data)
    })
  }, [])
  // 通过window.navigator获取当前浏览器的语言环境
  // const locale = window.navigator.language === 'zh-CN' ? 'zh' : 'en'

  // 暂时写死，后期会动态修改
  // const locale = 'en'

  // 根据当前语言环境决定返回什么包
  // 2. 引入antd中提供的语言包

  const messages = locale === 'en' ? en : zh
  const antdLocale = locale === 'en' ? enUS : zhCN
  return (
    <Router history={history}>
      <ConfigProvider locale={antdLocale}>
        {/* 
          locale表示当前语言环境

          message表示使用哪个语言包

      */}
        <IntlProvider locale={locale} messages={messages}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
