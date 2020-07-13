import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";

export function reqChapterList ({ page, limit, courseId }) {
    return request({
        url: `${BASE_URL}/${page}/${limit}`,
        method: "GET",
        params: {
            courseId
        }
    });
}