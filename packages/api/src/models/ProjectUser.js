import db from '../config/db.js';
import Sequelize, { DataTypes } from'sequelize';

class ProjectUser extends Sequelize.Model {};
ProjectUser.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'ProjectUser',
    tableName: 'project_user',
    freezeTableName: true,
})

export default ProjectUser;