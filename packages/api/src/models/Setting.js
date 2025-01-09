import db from '../config/db';
import Sequelize, { DataTypes } from'sequelize';

class Setting extends Sequelize.Model {};

Setting.init({
    /**
     * @type {number}
     * @description 设置id
     */
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize: db,
    modelName:'Setting',
    tableName:'settings',
    freezeTableName: true,
});

export default Setting;