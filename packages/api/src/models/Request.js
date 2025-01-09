/**
 * @name mock请求的记录
 */
import Sequelize, { DataTypes } from 'sequelize';
import db from '../config/db';
import DocumentModel from './Document';

class RequestModel extends Sequelize.Model {}

RequestModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '文档id',
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '请求来源',
    },
    headers: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '请求头',
    },
},
    {
        sequelize: db,
        modelName: 'Request',
        tableName:'requests',
        freezeTableName: true,
        paranoid: true,
});

export default RequestModel;