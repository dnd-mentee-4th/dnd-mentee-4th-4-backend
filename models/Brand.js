const Sequelize = require('sequelize');

module.exports = class Brand extends Sequelize.Model {
  static init = (sequelize) =>
    super.init(
      {
        id: {
          field: 'brand_id',
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        promotionUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
        modelName: 'Brand',
        tableName: 'Brand',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true,
      },
    );

  static associate(db) {
    db.Brand.hasMany(db.Promotion);
  }
};
