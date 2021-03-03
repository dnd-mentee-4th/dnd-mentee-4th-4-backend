const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        profileId: {
          type: Sequelize.STRING,
          allowNull: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
        modelName: 'User',
        tableName: 'User',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true,
      },
    );
  }
};
