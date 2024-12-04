import { useEffect } from 'react';
import { Dropdown, Space, message, Progress, Flex } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import LocaleButton from '../common/LocaleButton';
import Logo from '../common/Logo';
import { removeTokenFromLocalStorage } from '../../utils';
import { getCurrentUserApi, logoutApi } from './apis';
import CreateUserButton from './CreateUserButton';
import useStore from '../../store';

function Header() {
    const { userInfo, updateUserInfo, fetchUserInfo } = useStore(useShallow(({ userInfo, updateUserInfo, fetchUserInfo }) => ({ userInfo, updateUserInfo, fetchUserInfo })))
    // fetchUserInfo()
    const menuItems: any = [
        {
            label: (
                <Flex className='text-gray-400'>
                    <span className='mr-2'>邀请码:</span>
                    {userInfo.inviteCode}
                </Flex>
            ),
            key: '0',
        },
        {
            type: 'divider'
        },
        {
            label: (
                <CreateUserButton>
                    {
                        (_, setVisible) => (
                            <a onClick={() => setVisible(true)}>
                                创建用户
                            </a>
                        )
                    }
                </CreateUserButton>
            ),
            key: '1',
        },
        {
            label: (
                <a onClick={onLogout}>
                    退出登录
                </a>
            ),
            key: '2',
        }
    ];



    /**
     * @name 获取当前用户信息
     */
    async function getCurrentUser() {
        fetchUserInfo(getCurrentUserApi<any>);
    }

    /**
     * @name 退出登录
     */
    async function onLogout() {
        const res = await logoutApi<any>();
        if (res.code === 200) {
            removeTokenFromLocalStorage();
            message.success('退出成功');
            window.location.href = '/#/login';
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <div className="p-2 border-b flex justify-between">
            <h1 className="text-gray-100 text-sm">
                <Logo
                    width={30}
                    fontSize={18}
                />
            </h1>
            <Flex gap={20}>
                <Flex className='items-center content-center w-[150px]'>
                    <span className='text-nowrap mr-2'>容量:</span>
                    <Progress percent={(userInfo.documentCount / userInfo.stock) * 100} format={() => `${userInfo.documentCount} / ${userInfo.stock}`} />
                </Flex>
                <LocaleButton />
                {/* <Button icon={<TranslationOutlined />} color='primary' variant='link' /> */}
                <Dropdown
                    menu={{
                        items: menuItems
                    }}
                    placement="bottomRight"
                >
                    <Space>
                        <div className="flex gap-2 items-center">
                            <span
                                className="border rounded-full block text-sm w-[25px] h-[25px] overflow-hidden text-center line-[25px] bg-gray-200 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${userInfo.avatar})`,
                                }}
                            ></span>
                            {userInfo.username}
                        </div>
                    </Space>
                </Dropdown>
            </Flex>
        </div>
    );
}

export default Header;