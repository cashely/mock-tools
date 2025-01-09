import Router from '../utils/route';
import { nanoid } from 'nanoid';
import { transaction } from '../config/prismaDB';


const router = new Router({
  auth: true
});

router
  .get('/', async (req, res) => {

    transaction(async (prisma) => {
      // 查询当前作者的项目以及公开的项目
      const result = await prisma.project.findMany({
        where: {
          OR: [
            { creatorId: req.user.id },
            { open: 1 }
          ]
        },
        include: {
          creator: true,
          documents: true,
        }
      });
      res.response.success(result);
    }, res, '获取项目失败');
  })
  .get('/:id', async (req, res) => {

    transaction(async (prisma) => {
      const { id } = req.params;
      const result = await prisma.project.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          creator: true,
          documents: true,
        }
      });
      res.response.success(result);
    }, res, '获取项目失败');
  })

  .post('/', async (req, res) => {

    transaction(async (prisma) => {
      const { name, open, webhook } = req.body;
      const { user } = req;
      const result = await prisma.project.create({
        data: {
          name,
          open,
          webhook,
          creatorId: user.id,
          alias: nanoid(6),
        },
      });
      res.response.success(result);
    }, res, '创建项目失败');
  })

  .put('/:id', async (req, res) => {
    transaction(async (prisma) => {
      const { id } = req.params;
      const { user } = req;
      const projectResult = await prisma.project.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (projectResult.creatorId !== user.id) {
        return res.response.error(403, '该项目不是您创建的，无法更新');
      }
      const result = await prisma.project.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req.body,
        },
      });
      res.response.success(result);
    }, res, '更新项目失败');
  })

  .delete('/:id', async (req, res) => {

    transaction(async (prisma) => {
      const { id } = req.params;
      const { user } = req;
      const projectResult = await prisma.project.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (projectResult.creatorId !== user.id) {
        return res.response.error(403, '该项目不是您创建的，无法删除');
      }
      const result = await prisma.project.update({
        where: {
          id: Number(id),
        },
        data: {
          statu: 0
        }
      });
      res.response.success(result);
    }, res, '删除项目失败');
  })

export default router;

