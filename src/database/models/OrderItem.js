module.exports = (sequelize, dataTypes) => {
    const alias = "OrderItem";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        productId: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        quantity: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }

    const config = {
        tableName: "order_items",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const ORDER_ITEM = sequelize.define(alias, cols, config);

    ORDER_ITEM.associate = (models) => {
        
       /*  ORDER_ITEM.hasMany(models.Product, {
            as: "products",
            foreignKey: "productId",
        }); */

        ORDER_ITEM.belongsTo(models.Order, {
            as: "order",
            foreignKey: "orderId",
        })
    }

    return ORDER_ITEM;
}