/**
 * @name prisma事务
 */

function transaction(prisma) {
    return (callback, res) => {
        prisma.$transaction(async ($prisma) => {
            await callback($prisma);
        }).then(() => {
            console.log('事务提交成功');
        }).catch((error) => {
            console.log(error, '事务提交失败');
            res.response.error(500, '操作失败');
        });
    }
}

export default transaction;