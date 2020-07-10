import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

const MOCK_URL = `http://localhost:7777${BASE_URL}`

// 获取讲师
export function reqGetSubject (page, limit) {
    return request({
        url: `${MOCK_URL}/${page}/${limit}`,
        method: "GET",
    });
}

