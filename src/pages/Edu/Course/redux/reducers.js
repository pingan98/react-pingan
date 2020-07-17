import { GET_COURSE_LIMIT_LIST } from './constant'


const initCourseList = {
    total: 0,
    items: []
}

export default function courseList (prevState = initCourseList, action) {

    switch (action.type) {
        case GET_COURSE_LIMIT_LIST:
            return action.data
        default:
            return prevState;
    }



}