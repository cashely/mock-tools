import { transaction } from '../config/prismaDB';
import Router from '../utils/route';

const router = new Router();

router.post('/', async (req, res) => {
    transaction(async (prisma) => {
        const { projectId, name } = req.body;
        const result = await prisma.folder.create({
            data: {
                project: {
                    connect: {
                        id: Number(projectId)
                    }
                },
                name
            }
        })
        res.response.success(result);
    }, res);
})
.get('/', async (req, res) => {
    const { projectId } = req.query;
    transaction(async (prisma) => {
        const result = await prisma.folder.findMany({
            where: {
                projectId: Number(projectId)
            },
            include: {
                project: true
            }
        });
        res.response.success(result);
    }, res);
})

export default router;