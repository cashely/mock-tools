import db from '../config/db.js';
import Project from './Project.js';
import Sequelize, { DataTypes } from "sequelize";

class Folder extends Sequelize.Model {};

Folder.init({
    /**
     * @type {number}
     * @description 文件夹id
     */
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    /**
     * @type {string}
     * @description 文件夹名称
     */
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * @type {number}
     * @description 文件夹所属项目id
     */
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    /**
     * @type {number}
     * @description 文件夹父文件夹id
     */
    folderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * @type {number}
     * @description 文件夹序号
     */
    index: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    /**
     * @type {number}
     * @description 文件夹状态
     */
    statu: {
        type: DataTypes.INTEGER,
        defaultValue: 1 // 1: 正常 0: 已删除
    },
}, {
    sequelize: db,
    modelName: 'Folder',
    tableName: 'folders',
    freezeTableName: true,
    paranoid: true
});

export default Folder;