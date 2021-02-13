const { Category } = require('../models');

const findAll = () => {
  return Category.findAll();
};

module.exports = {
  findAll,
};
