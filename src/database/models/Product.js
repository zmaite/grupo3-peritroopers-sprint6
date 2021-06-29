module.exports = (sequelize, dataTypes) => {
  let alias = 'Product';

  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(120),
      allowNull: false
    },
    description: {
      type: dataTypes.STRING(180),
      allowNull: false
    },
    price: {
      type: dataTypes.DECIMAL(8, 2),
      allowNull: false
    },
    image: {
      type: dataTypes.BLOB('medium'),
      allowNull: false
    },
    stock: {
      type: dataTypes.INTEGER(11),
      allowNull: false
    },
    brandId: dataTypes.INTEGER.UNSIGNED,
    categoryId: dataTypes.INTEGER.UNSIGNED,
    colorId: dataTypes.INTEGER.UNSIGNED,
  };

  let config = {
    timestamps: false
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function(models) {
    // belongsTo
    Product.belongsTo(models.Brand, {
      foreignKey: 'brandId',
      as: 'brands'
    });

    // belongsTo
    Product.belongsTo(models.Color, {
      foreignKey: 'colorId',
      as: 'colors'
    });
    // belongsTo
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'categories'

    });
    // hasMany
    Product.hasMany(models.Order, {
        foreignKey: 'productId',
        as: "orders"
      })
  }

  return Product

}