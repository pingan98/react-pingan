import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constant'

import { reqChapterList } from '@api/edu/chapter'
import { reqGetLessonList } from '@api/edu/lesson'


function getChapterListSync (data) {
    return {
        type: GET_CHAPTER_LIST,
        data
    }
}

export function getChapterList ({ page, limit, courseId }) {
    return dispatch => {
        return reqChapterList({ page, limit, courseId }).then((res) => {
            dispatch(getChapterListSync(res))
            return res
        })
    }
}

function getLessonListSync (data) {
    return {
        type: GET_LESSON_LIST,
        data
    }
}

export function getLessonList (chapterId) {
    return dispatch => {
        return reqGetLessonList(chapterId).then((res) => {
            dispatch(getLessonListSync(res))
            return res
        })
    }
}