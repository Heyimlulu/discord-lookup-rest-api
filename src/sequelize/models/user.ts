import { DataTypes, Sequelize } from "sequelize";

export const userModel = (sequelize: Sequelize) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        clientId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "clientId_unique",
                msg: "The clientId must be unique",
            },
        },
        clientSecret: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "clientSecret_unique",
                msg: "The clientSecret must be unique",
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'username_unique',
                msg: 'Username already exists'
            }
        },
        password: {
            type: DataTypes.STRING,
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
