import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// const MOCK_URL = `http://localhost:7777${BASE_URL}`

// 获取一级
export function reqGetSubjectList (page, limit) {
    return request({
        url: `${BASE_URL}/${page}/${limit}`,
        method: "GET",
    });
}
//获取二级
export function reqGetSecSubjectList (parentId) {
    return request({
        url: `${BASE_URL}/get/${parentId}`,
        method: "GET",
    });
}
//添加
export function reqAddSecSubjectList (title, parentId) {
    return request({
        url: `${BASE_URL}/save`,
        method: "POST",
        data: {
            title,
            parentId
        }
    });
}

// 修改----确定按钮
export function reqUpdateSunjectList (title, id) {
    return request({
        url: `${BASE_URL}/update`,
        method: 'PUT',
        data: {
            title,
            id
        }
    })
}
// 删除-----操作
export function reqDelSubject (id) {
    return request({
        url: `${BASE_URL}/remove/${id}`,
        method: 'DELETE'
    })
}

