module.exports = (sequelize, dataTypes) => {
    const alias = "Order";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        state: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    }

    const config = {
        tableName: "orders",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const ORDER = sequelize.define(alias, cols, config);

    ORDER.associate = (models) => {

        ORDER.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId",
        });

        ORDER.hasMany(models.OrderItem, {
            as: "orderItems",
            foreignKey: "orderId"
        });
    }

    return ORDER;
}