import type { RequestResult } from '../../index.d';
import request from "../../utils/request";

/**
 * @name 登录
 */

export async function loginApi<T>(params: {
    username: string;
    password: string;
}): Promise<RequestResult<T>> {
    return request.post("/login", params);
}