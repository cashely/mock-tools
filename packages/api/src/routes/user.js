import md5 from 'md5';
import { nanoid } from 'nanoid';
import { transaction } from '../config/prismaDB';
import { signToken } from '../utils';
import Router from "../utils/route";

const loginRouter = new Router();
// console.log(userService.findAll({}))

loginRouter.post('/', async (req, res) => {
    transaction(async (prisma) => {
        const { username, password } = req.body;
        const userResult = await prisma.user.findFirst({
            where: {
                username,
                password: md5(password),
                
            }
        });
        if (!userResult) {
            return res.response.error(400, '用户名或密码错误');
        }
        return res.response.success(signToken(userResult));
    }, res);
})

const signUpRouter = new Router();
signUpRouter.post('/', async (req, res) => {
    transaction(async (prisma) => {
        const { username, password, email, inviteCode } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }],
            }
        });
        if (user) {
            return res.response.error(400, '用户名或邮箱已存在');
        }

        let inviteUser = {};

        if (inviteCode) {
            // 根据邀请的code查找存在的用户
            inviteUser = await prisma.user.findFirst({
                where: {
                    inviteCode
                }
            });

            if (!inviteUser) {
                return res.response.error(400, '错误的邀请码');
            }

            // 邀请码的用户可创建的文档增加50个
            await prisma.user.update({
                where: {
                    id: inviteUser.id
                },
                data: {
                    stock: inviteUser.stock + 50
                }
            });
        }
        const userInstance = {
            username,
                password: md5(password),
                email,
                inviteUser: {
                },
                inviteCode: nanoid(5).toUpperCase()
        }
        if (!!inviteCode) {
            userInstance.inviteUser.connect = { id: inviteUser.id };
        }
        await prisma.user.create({
            data: userInstance
        });
        res.response.success(true);
    }, res);
})

export {
    loginRouter,
    signUpRouter
};

const router = new Router({
    auth: true
});

router.get('/', async (req, res) => {
    transaction(async (prisma) => {
        const users = await prisma.user.findMany();
        res.response.success(users);
    })
})
    .get('/current', async (req, res) => {
        try {
            
        } catch (error) {
            res.response.error(400, error.message);
        }

        transaction(async (prisma) => {
            const { user } = req;
            const userResult = prisma.user.findUnique({
                where: {
                    id: user.id
                }
            });
            const documentResult = prisma.document.count({
                where: {
                    creatorId: user.id,
                    statu: 1
                }
            });
            const [users, documentCount] = await Promise.all([userResult, documentResult]);
            res.response.success({
                ...users,
                documentCount
            });
        }, res, '查询用户信息失败')
    })
    .post('/', async (req, res) => {
        const { user } = req;
        const { username, password, email, role = 0, avatar = 'https://www.loliapi.com/acg/pc/', inviteCode } = req.body;
        transaction(async (prisma) => {
            // 邀请码校验
            if (inviteCode) {
                const userResult = await prisma.user.findUnique({
                    where: {
                        inviteCode
                    }
                });
                // console.log(userResult, 'userResult')
                if (!userResult) {
                    return res.response.error(400, '邀请码错误');
                }
                // 邀请码的用户可创建的文档增加50个
                await prisma.user.update({
                    id: userResult.id
                }, {
                    stock: userResult.stock + 50
                });

            }

            const userResult = await prisma.user.create({
                data: {
                    username,
                    password: md5(password),
                    email,
                    role,
                    avatar,
                    creatorId: user.id
                }
            });
            res.response.success(userResult);
        }, res)
    })
    .post('/logout', async (req, res) => {
        delete req.user;
        res.response.success();
    })

export default router;