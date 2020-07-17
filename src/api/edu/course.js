import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

export function reqCourseList () {
    return request({
        url: `${BASE_URL}`,
        method: "GET",
    });
}
// 获取课程分页列表
export function reqGetCourseLimitList ({ page, limit, teacherId, subjectId, subjectParentId, title }) {
    return request({
        url: `${BASE_URL}/${page}/${limit}`,
        method: "GET",
        data: {
            teacherId,
            subjectId,
            subjectParentId,
            title
        }
    });
}