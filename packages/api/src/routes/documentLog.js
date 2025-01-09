import { transaction } from "../config/prismaDB"; 
import Router from "../utils/route";

const router = new Router({
    auth: true
});

router.get('/', async (req, res) => {
    transaction(async (prisma) => {
        const logs = await prisma.documentLog.findMany({
            include: {
                operator: true
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        });
        res.response.success(logs);
    })
})
.get('/:id', async (req, res) => {
    const { id } = req.params;
    transaction(async (prisma) => {
        const log = await prisma.documentLog.findUnique({
            where: {
                id
            },
            include: {
                operator: true
            }
        });
        res.response.success(log);
    })
})
.get('/document/:documentId', async (req, res) => {
    const { documentId } = req.params;
    transaction(async (prisma) => {
        const result = await prisma.documentLog.findMany({
            where: {
                documentId: Number(documentId)
            },
            orderBy: {
                id: 'desc'
            },
            include: {
                operator: true
            }
        });
        res.response.success(result);
    }, res, '查询文档日志失败');
})

export default router;