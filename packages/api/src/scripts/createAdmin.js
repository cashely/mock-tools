import md5 from 'md5';
import models from "../models";


export default async function createAdmin() {
    const { User } = models;

    const admin = await User.findOne({
        where: {
            role: 1,
        }
    });

    if (!admin) {
        const password = md5('admin');
        await User.create({
            username: 'admin',
            password,
            email: '290119516@qq.com',
            role: 1,
        });
        console.log('创建管理员账号成功', `\n账号为：admin 密码为：${password}`);
    } else {
        console.log('管理员账号已存在');
    }
}