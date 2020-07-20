import request from "@utils/request";

const BASE_URL = "oauth";

// 获取手机验证码
export function reqVerifyCode (mobile) {
    return request({
        url: `${BASE_URL}/sign_in/digits`,
        method: "POST",
        data: {
            mobile
        }
    });
}
// 手机号登录
export function reqMobileCode (mobile, code) {
    return request({
        url: `${BASE_URL}/mobile`,
        method: "POST",
        data: {
            mobile,
            code
        }
    });
}

