import type { Slice } from './index.d';
import { RequestResult } from '../index.d';

interface UserInfoState {
    userInfo: Record<string, any>;
}

interface UserInfoActions {
    updateUserInfo: (userInfo: Record<string, any>) => void;
    fetchUserInfo: (fn: (args?: any[]) => Promise<RequestResult<any>>) => void;
}

export type UserInfoStore = UserInfoState & UserInfoActions;

const userInfoSlice: Slice<UserInfoState, UserInfoActions> = (set) => ({
    userInfo: {},
    updateUserInfo: (userInfo) => {
        set((state) => {
            state.userInfo = userInfo;
        })
    },
    fetchUserInfo: async (userInfoApi) => {
        const res = await userInfoApi();
        if (res.code === 200) {
            set((state) => {
                state.userInfo = res.data;
            })
            return res.data;
        }
    }
})

export default userInfoSlice;