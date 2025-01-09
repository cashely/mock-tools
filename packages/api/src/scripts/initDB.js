import 'dotenv/config'
import models from '../models/index';
import sequelize from '../config/db';
import createRelation from './createRelation';
import createAdmin from './createAdmin';

Promise.all(
  Object.values(models)
        .map(model => model.sync({ force: true }))
).then(() => {
  console.log('数据表全部创建完成, 开始创建关联关系');
  createRelation(models);
})
.then(() => {
  console.log('创建默认用户');
  return createAdmin();
})
.then(() => {
  return sequelize.sync({ alter: true });
})
.then(() => {
  console.log('关联关系创建完成, 数据结构同步成功');
})
.catch((err) => {
  console.log('同步失败', err);
});