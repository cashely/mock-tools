import db from '../config/db.js';
import Sequelize, { DataTypes } from'sequelize';
import User from './User.js';
// import Document from './Document.js';
import ProjectUser from './ProjectUser.js';

class Project extends Sequelize.Model {};
/**
 * @description 项目模型
 * @class Project
 */
Project.init({
    /**
     * @type {number}
     * @description 项目id
     */
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    /**
     * @type {string}
     * @description 项目名称
     */
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * @type {string}
     * @description 项目别名
     */
    alias: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @type {string}
     * @description 项目描述
     */
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @type {number}
     * @description 项目状态
     */
    statu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // 0 - 删除 1 - 正常
    },
    /**
     * @type {number}
     * @description 项目创建者
     */
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * @type {number}
     * @description 项目最后一次修改者
     */
    latstCreator: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * 开放程度 0: 私有 1: 公开
     */
    open: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    /**
     * 统一的返回模版
     */
    template: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * webhook 地址
     */
    webhook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'Project',
    tableName: 'projects',
    freezeTableName: true,
    // paranoid: true
});


export default Project;