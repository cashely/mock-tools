import db from "../config/db";
import Sequelize, { DataTypes } from "sequelize";

class Reference extends Sequelize.Model {};
/**
 * @description 引用模型
 * @class Document
 */
Reference.init({
    /**
     * @type {number}
     * @description 引用片段id
     */
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    /**
     * @type {string}
     * @description 引用片段名称
     */
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * @type {string}
     * @description 引用片段别名
     */
    alias: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @type {string}
     * @description 引用片段描述
     */
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @type {number}
     * @description 引用片段创建者
     */
    creator: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * @type {number}
     * @description 引用片段最后一次修改者
     */
    latstCreator: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * @type {string}
     * @description 引用片段内容
     */
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * @type {number}
     * @description 引用片段状态 1: 正常 0: 禁用
     */
    statu: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // 1: 正常 0: 禁用
    },
}, {
    sequelize: db,
    modelName:'Reference',
    tableName:'references',
    freezeTableName: true,
    paranoid: true
})

export default Reference;