module.exports = (sequelize, dataTypes) => {
    const alias = "Category";

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
        banner: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
    }

    const config = {
        tableName: "categories",
        timestamps: false,
    }

    const CATEGORY = sequelize.define(alias, cols, config);

    CATEGORY.associate = (models) => {
        CATEGORY.hasMany(models.Subcategory, {
            as: "subcategories",
            foreignKey: "category_id"
        })
    }

    return CATEGORY;
}