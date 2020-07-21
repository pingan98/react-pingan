import { GET_USER_INFO, GET_MENU_INFO } from './constants'

const initUser = {
    name: '', // 用户名
    avatar: '', // 用户头像
    permissionValueList: [], // 用户按钮级别权限
    permissionList: [] // 用户菜单级别的权限/路由级别的权限
}

export default function user (prevState = initUser, action) {
    switch (action.type) {
        case GET_USER_INFO:
            console.log(action)
            return {
                // 解构原来的数据 ---内有四条
                ...prevState,
                // 解构新的数据 ,新的会覆盖原来的
                ...action.data
            }
        case GET_MENU_INFO:
            return {
                // 解构原来的数据
                ...prevState,
                // 解构新的数据
                permissionList: action.data
            }

        default:
            return prevState
    }
}