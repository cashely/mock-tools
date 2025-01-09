import fd from 'fast-diff';
import Router from '../utils/route';
import { convertMethodToNumber } from '../utils/index';
import { transaction } from '../config/prismaDB';

const router = new Router({
  auth: true
});

router
  .get('/', async (req, res) => {
    const { projectId } = req.query;
    transaction(async (prisma) => {
      const result = await prisma.document.findMany({
        where: {
          projectId: Number(projectId),
          statu: 1
        }
      });
      res.response.success(result);
    }, res);
  })

  .get('/count', async (req, res) => {
    const { projectId } = req.query;
    transaction(async (prisma) => {
      const result = await prisma.document.count({
        where: {
          projectId: Number(projectId),
          statu: 1
        }
      });
      res.response.success(result);
    }, res, '统计文档数量失败');
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    transaction(async (prisma) => {
      const result = await prisma.document.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          schema: true,
          project: true,
          folder: true,
          schedule: true,
        }
      });
      res.response.success(result);
    }, res, '查询文档失败');
  })

  .post('/', async (req, res) => {
    const { projectId, name, content, path, folderId, description, type, useTemplate, protocol, scheduleId } = req.body;
    const { user } = req;
    transaction(async (prisma) => {

      // 如果useTemplate为1的时候，检查项目是否项目模版已经包含的内容
      if (useTemplate === 1) {
        const project = await prisma.project.findUnique({
          where: {
            id: Number(projectId)
          }
        });
        if (!project.template) {
          return res.response.error(200, '该项目没有模版内容，无法使用模版');
        }
      }

      const documentLogInstance = {
        operator: {
          connect: {
            id: user.id
          }
        },
        content,
        type: 1,
        document: {
          create: {
            name,
            path,
            project: {
              connect: {
                id: Number(projectId)
              }
            },
            creator: {
              connect: {
                id: user.id
              }
            },
            latestCreator: {
              connect: {
                id: user.id
              }
            },
            schema: {
              create: {
                name,
                content
              }
            },
            description,
            type,
            useTemplate,
            protocol,
          }
        }
      }
      if (!!scheduleId) {
        documentLogInstance.schedule = {
          connect: {
            id: scheduleId
          }
        }
      }
      
      if (!!folderId) {
        documentLogInstance.document.create.folder = {
          connect: {
            id: folderId
          }
        }
      }
      const documentLogResult = await prisma.documentLog.create({
        data: documentLogInstance
      });
      res.response.success(documentLogResult);
    }, res, '创建文档失败');
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const { content, name, description, type, schemaId, path, useTemplate, protocol, scheduleId } = req.body;
    transaction(async (prisma) => {
      const documentResult = await prisma.document.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          schema: true,
        }
      });

      console.log(useTemplate, 'useTemplate')

      // 如果useTemplate为1的时候，检查项目是否项目模版已经包含的内容
      if (useTemplate === 1) {
        const project = await prisma.project.findUnique({
          where: {
            id: documentResult.projectId
          }
        });
        console.log(project, 'project');
        if (!project.template) {
          return res.response.error(500, '该项目没有模版内容，无法使用模版');
        }
      }

      // 如果不是文档的作者不允许执行删除操作
      if (documentResult.creatorId !== user.id) {
        return res.response.error(403, '该文档不是您创建的，无法修改');
      }

      const isDiffContent = fd(content, documentResult.schema.content);

      if (isDiffContent.length > 1) {
        await prisma.schema.update({
          where: {
            id: schemaId
          },
          data: {
            content
          }
        });

        await prisma.documentLog.create({
          data: {
            document: {
              connect: {
                id: Number(id)
              }
            },
            operator: {
              connect: {
                id: user.id
              }
            },
            content,
            type: 0
          }
        });
      }
      
      const documentInstance = {
        name,
        description,
        type,
        path,
        useTemplate,
        protocol
      }
      if (!!scheduleId) {
        documentInstance.schedule = {
          connect: {
            id: scheduleId
          }
        }
      }
      const result = await prisma.document.update({
        where: {
          id: Number(id)
        },
        data: documentInstance
      });
      res.response.success(result);
    }, res, "更新文档失败");
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    transaction(async (prisma) => {
      // 如果不是文档的作者不允许执行删除操作
      const documentResult = await prisma.document.findUnique({
        where: {
          id: Number(id)
        },
      });
      if (documentResult.creatorId !== user.id) {
        return res.response.error(403, '该文档不是您创建的，无法删除');
      }
      const result = await prisma.document.update({
        where: {
          id: Number(id)
        },
        data: {
          statu: 0
        }
      });

      const updateDocumentUserStock = await prisma.user.update({
        where: {
          id: documentResult.creatorId
        },
        data: {
          stock: {
            increment: 1
          }
        }
      })

      console.log(updateDocumentUserStock, 'updateDocumentUserStock')

      const documentLogInstance = {
        document: {
          connect: {
            id: Number(id)
          }
        },
        operator: {
          connect: {
            id: user.id
          }
        },
        type: 2
      }

      await prisma.documentLog.create({
        data: documentLogInstance
      });
      res.response.success(result);
    })
  })

  .get('/export/:id', async (req, res) => {
    const { id } = req.params;
    transaction(async (prisma) => {
      const result = await prisma.document.findUnique({
        where: {
          id
        },
        include: {
          schema: true,
        }
      });
      res.response.success({
        content: result.toJSON().schema.content
      })
    })
  })

  // @name 获取文档mock的访问记录
  .get('/request/:id', async (req, res) => {
    const { id } = req.params;
    transaction(async (prisma) => {
      const result = await prisma.request.findMany({
        where: {
          documentId: Number(id)
        }
      });
      res.response.success(result);
    }, res);
  })
  // 从swagger批量导入
  .post('/import/swagger', async (req, res) => {
    transaction(async (prisma) => {
      const { user } = req;
      const { projectId, documents } = req.body;
      const filterNullContent = documents.filter((item) => item.content);
      const nullContent = documents.filter((item) => !item.content);
      const schemaEntitys = filterNullContent.map((item) => {
        return {
          name: `${item.path}_${item.method}`,
          content: item.content,
        }
      });
      const schemaResults = await prisma.schema.createManyAndReturn({
        data: schemaEntitys
      });

      // 把空的内容跟非空的内容聚合成新的文档实体
      const documentEntitys = [
        ...nullContent.map((item) => {
          return {
            name: `${item.path}`,
            path: item.path,
            method: convertMethodToNumber(item.method),
            description: item.description,
            type: 0,
            projectId,
            creatorId: user.id
          }
        }),
        ...schemaResults.map((item, index) => {
          return {
            name: `${filterNullContent[index].path}`,
            path: filterNullContent[index].path,
            method: convertMethodToNumber(filterNullContent[index].method),
            description: filterNullContent[index].description,
            type: 0,
            projectId,
            creatorId: user.id,
            schemaId: item.id
          }
        })
      ];
      // 批量创建文档
      const documentResults = await prisma.document.createMany({
        data: documentEntitys
      });

      res.response.success(documentResults);
    }, res);
  })


export default router;