const { Brand } = require('../models');
const sequelize = require('sequelize');

const op = sequelize.Op;

const findByName = (name) => {
  return Brand.findOne({
    where: {
      name,
    },
  });
};

const findAll = () => {
  return Brand.findAll();
};

const searchByName = (brandName) => {
  return Brand.findAll({
    where: {
      name: { [op.like]: `%${brandName}%` },
    },
  });
};

module.exports = {
  findAll,
  findByName,
  searchByName,
};
