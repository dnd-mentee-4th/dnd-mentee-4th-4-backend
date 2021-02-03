const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
  static init = (sequelize) =>
    super.init(
      {
        id: {
          field: 'category_id',
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
        modelName: 'Category',
        tableName: 'Category',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true,
      },
    );

  static associate(db) {
    db.Category.hasMany(db.Brand);
  }
};
