module.exports = (sequelize, dataTypes) => {
    const alias = "Subcategory";

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
        category_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }

    const config = {
        tableName: "subcategories",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const SUBCATEGORY = sequelize.define(alias, cols, config);

    SUBCATEGORY.associate = (models) => {
        SUBCATEGORY.hasMany(models.Product, {
            as: "products",
            foreignKey: "subcategory_id",
        });

        SUBCATEGORY.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        });
    }

    return SUBCATEGORY;
}