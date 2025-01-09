import db from '../config/db.js';
import Sequelize, { DataTypes } from'sequelize';
import User from './User.js';
import Document from './Document.js';

/**
 * @name 文档日志
 */
class DocumentLog extends Sequelize.Model {};

DocumentLog.init({
    /**
     * @name 操作类型
     */
    type: {
        type: DataTypes.INTEGER, // 0: 编辑 1: 新增 2: 删除
        allowNull: false,
    },
    /**
     * @name 操作内容
     */
    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @name 操作人
     */
    operatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    /**
     * @name 操作时间
     */
    time: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
    },
    /**
     * @name 操作文档
     */
    documentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'DocumentLog',
    tableName: 'document_logs',
    freezeTableName: true,
    paranoid: true,
});

export default DocumentLog;