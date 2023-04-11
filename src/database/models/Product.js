module.exports = (sequelize, dataTypes) => {
    const alias = "Product";

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
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER(11),
        },
        description: {
            type: dataTypes.STRING(800),
        },
        subcategory_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }

    const config = {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const PRODUCT = sequelize.define(alias, cols, config);

    PRODUCT.associate = (models) => {
        PRODUCT.belongsTo(models.Subcategory, {
            as: "subcategory",
            foreignKey: "subcategory_id",
        });
        
        PRODUCT.hasMany(models.ProductImage, {
            as: "images",
            foreignKey: "product_id",
        });

       /*  PRODUCT.belongsTo(models.OrderItem, {
            as: "orderItem",
            foreignKey: "productId"
        }); */
    }

    return PRODUCT;
}