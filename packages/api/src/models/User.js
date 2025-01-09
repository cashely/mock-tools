import db from '../config/db.js';
import Sequelize, { DataTypes } from 'sequelize';

class User extends Sequelize.Model {};

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 0: 普通用户 1: 管理员
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * @name 头像
     */
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @name 简介
     */
    intro: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '简介',
    },
    /**
     * @name wxid
     */
    wxid: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '微信id',
    },
    /**
     * @name 手机号
     */
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '手机号',
    },
    /**
     * @name 可存储文档数量
     */
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 50,
    },
    /**
     * @name 邀请码
     */
    inviteCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @name 邀请人
     */
    inviteUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true,
    // paranoid: true,
});


export default User;