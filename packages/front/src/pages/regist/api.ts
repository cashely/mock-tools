import type { RequestResult } from '../..';
import request from "../../utils/request";

/**
 * @name 登录
 */

export async function regiestApi<T>(params: {
    username: string;
    password: string;
    email: string;
    inviteCode?: string;
}): Promise<RequestResult<T>> {
    return request.post("/signUp", params);
}