module.exports = (sequelize, dataTypes) => {
    const alias = "User";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        last_name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(60),
            allowNull: false,
        },
        pass: {
            type: dataTypes.STRING(70),
            allowNull: false,
        },
        phone: {
            type: dataTypes.STRING(30),
        },
        rol: {
            type: dataTypes.INTEGER(2),
            allowNull: false,
            defaultValue: 0
        },
        avatar: {
            type: dataTypes.STRING(100),
        },
    }

    const config = {
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const USER = sequelize.define(alias, cols, config);

    /* USER.associate = (models) => {
        
    } */

    return USER;
}