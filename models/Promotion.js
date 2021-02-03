const Sequelize = require('sequelize');

module.exports = class Promotion extends Sequelize.Model {
  static init = (sequelize) =>
    super.init(
      {
        id: {
          field: 'promotion_id',
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        startAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
        modelName: 'Promotion',
        tableName: 'Promotion',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true,
      },
    );
};
