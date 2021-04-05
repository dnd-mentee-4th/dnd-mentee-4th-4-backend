'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Brands', [
      {
        name: '무신사',
        url: 'https://www.musinsa.com',
        promotionUrl: 'https://store.musinsa.com/app/plan/lists',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '스타일쉐어',
        url: 'https://www.styleshare.kr',
        promotionUrl: 'https://www.styleshare.kr/store',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {});
  },
};
