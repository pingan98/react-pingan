
import { GET_USER_INFO, GET_MENU_INFO } from './constants'
// 引入需要的
import { getInfo, getMenu } from "@api/acl/login"

//写两对同步、异步action



// 第一对，获取用户信息
function getUserInfoSync (data) {
    return { type: GET_USER_INFO, data }
}

export function getUserInfo () {
    return dispatch => {
        return getInfo().then(res => {
            dispatch(getUserInfoSync(res))
            return res
        })
    }
}

// 第二对   获取菜单列表

function getUserMenuSync (data) {
    return { type: GET_MENU_INFO, data }
}


export function getUserMenu () {
    return dispatch => {
        return getMenu().then(res => {
            dispatch(getUserMenuSync(res.permissionList))
            return res.permissionList
        })
    }
}