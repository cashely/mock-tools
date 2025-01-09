import { Router } from 'express';
import df from 'd-forest';
import { isMatch } from 'micromatch';
import { convertNumberToMethod } from '../utils/index';
import schemaParser from '../utils/schemaParser';

import { transaction } from '../config/prismaDB';

const router = Router();

router.use('/:projectAlias/*', async (req, res) => {
  transaction(async (prisma) => {

    // project的项目名称
    const { projectAlias } = req.params;

    // document的路径参数
    const path = req.params[0];

    const { ip: from, headers, method } = req;

    // return res.json(req.headers)

    const result = await prisma.document.findMany({
      where: {
        path,
        project: {
          alias: projectAlias
        }
      },
      include: {
        project: true,
        schema: true,
        folder: true,
        schedule: true,
      },
    });

    const findMatchDocument = result.filter(document => {
      // 把/pet/{abc}/{abc}的结构，转换成/pet/*/*
      // 然后用micromatch去匹配
      // 匹配到了，就返回true
      // 没有匹配到，就返回false
      const regPath = document.path.replace(/{\w+}/ig, '*');
      if (document.method === 'all' || document.method === 0) {
        return true;
      }
      return isMatch(`${method.toUpperCase()}_${path}`, `${convertNumberToMethod(document.method)}_${regPath}`);
    });



    if (findMatchDocument.length === 0) {
      return res.status(404).send('document not found');
    }

    const documentJson = findMatchDocument[0];

    await prisma.request.create({
      data: {
        from,
        headers: JSON.stringify(headers),
        documentId: documentJson.id
      }
    })


    let content = JSON.parse(documentJson.schema.content);
    console.log(content, 'content')
    if (!content) {
      return res.send(content);
    }

    if (documentJson.type === 0) {
      content = schemaParser(content);
    }
    console.log(content, 'content')
    if (documentJson.useTemplate === 1) {
      const projectResult = await prisma.project.findUnique({
        where: {
          id: documentJson.projectId
        }
      });

      const _templateContent = content;
      content = JSON.parse(projectResult.template);

      df.forEachNode(content, (node) => {
        Object.keys(node).map((key) => {
          if (node[key] === '@template') {
            node[key] = _templateContent;
          }
        })
      })
    }
    res.json(content);
  }, res);
})

export default router;