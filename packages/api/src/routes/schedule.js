import Router from "../utils/route";
import { transaction } from "../config/prismaDB";

const router = new Router({
    auth: true
});

router.get("/", async (req, res) => {
  transaction(async (prisma) => {
    const result = await prisma.schedule.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    res.response.success(result);
  }, res);
})
.get("/:id", async (req, res) => {
  transaction(async (prisma) => {
    const result = await prisma.schedule.findUnique({
      where: {
        id
      },
      include: {
        creator: true
      }
    });
    res.response.success(result);
  }, res, '查询定时任务失败');
})
.post('/', async (req, res) => {
    const { times, path, gap, method } = req.body;
    transaction(async (prisma) => {
        const result = await prisma.schedule.create({
            data: {
                times,
                path,
                gap,
                method,
                creatorId: req.user.id
            }
        });
        res.response.success(result);
    }, res, '创建定时任务失败');
})
.delete('/:id', async (req, res) => {
    transaction(async (prisma) => {
        const result = await prisma.schedule.delete({
            where: {
                id
            }
        });
        res.response.success(result);
    })
})

export default router;

