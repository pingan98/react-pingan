import { GET_COURSE_LIMIT_LIST } from './constant'
import { reqGetCourseLimitList } from '@api/edu/course'

// 获取课程分页列表的  同步action 
function getCourseLimitListSync (data) {
    return { type: GET_COURSE_LIMIT_LIST, data }
}
// 获取课程分页列表  异步action

export function getCourseLimitList (data) {
    return dispatch => {
        return reqGetCourseLimitList(data).then((res) => {
            dispatch(getCourseLimitListSync(res))
            return res
        })
    }
}
