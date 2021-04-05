'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Promotions', {
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'brands',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Promotions');
  },
};
