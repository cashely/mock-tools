import { RequestResult } from "../../index.d";
import request from "../../utils/request";


/**
 * @name 创建用户
 */
export const createUserApi = <T> (data: any): Promise<RequestResult<T>> => {
    return request({
        url: "/user",
        method: "post",
        data
    })
}

/**
 * @name 退出登录
 */
export const logoutApi = <T> (): Promise<RequestResult<T>> => {
    return request({
        url: "/user/logout",
        method: "post"
    })
}

/**
 * @name 获取当前用户信息
 */
export const getCurrentUserApi = <T> (): Promise<RequestResult<T>> => {
    return request({
        url: "/user/current",
        method: "get"
    })
}