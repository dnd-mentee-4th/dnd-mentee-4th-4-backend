const sequelize = require('sequelize');
const { Brand, Promotion } = require('../models');

const op = sequelize.Op;

const searchByBrand = async (brandName) => {
  return await Brand.findAll({
    where: {
      name: { [op.like]: `%${brandName}%` },
    },
  });
};

const searchByTitle = async (title) => {
  return await Promotion.findAll({
    where: {
      title: { [op.like]: `%${title}%` },
    },
  });
};

const searchByDescription = async (description) => {
  return await Promotion.findAll({
    where: {
      description: { [op.like]: `%${description}%` },
    },
  });
};

module.exports = {
  searchByBrand,
  searchByTitle,
  searchByDescription,
};
