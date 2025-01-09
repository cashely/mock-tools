import { Router } from 'express';
import { transaction } from '../config/prismaDB';

const router = Router({
  auth: true,
});

router.get('/', async (req, res) => {

  transaction(async (prisma) => {
    const result = await prisma.document.findMany({
      include: {
        schema: true,
        project: true,
        folder: true,
        schedule: true,
      }
    });
    res.response.success(result);
  }, res);
})


export default router;

