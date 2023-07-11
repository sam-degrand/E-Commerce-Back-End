const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product', // references the 'product' model
        key: 'id', // references the 'id' column of the 'product' model
        unique: false
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag', // references the 'tag' model
        key: 'id', // references the 'id' column of the 'tag' model
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
