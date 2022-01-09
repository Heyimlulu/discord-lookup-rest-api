import { DataTypes, Sequelize } from "sequelize";

export function logsModel (sequelize: Sequelize) {
    return sequelize.define("Logs", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
}
