import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @name prisma事务
 * @param {(prisma) => Promise<void>} callback 
 * @param {ExpressResponse} res 
 */
export async function transaction(callback, res, errorMessage = '操作失败') {
    try {
        await prisma.$transaction(callback, {
            timeout: 100000,
            maxWait: 100000,
            retryOnTimeout: true,
        });
        console.log('事务提交成功');
    } catch (error) {
        console.log(error, '事务提交失败');
        res.response.error(500, errorMessage);
    }
}

export default prisma;