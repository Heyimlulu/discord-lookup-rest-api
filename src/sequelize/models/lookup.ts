import { DataTypes, Sequelize } from "sequelize";

export const lookupModel = (sequelize: Sequelize) => {
    return sequelize.define("Lookup", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        total_search: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        does_exist: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        is_bot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
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