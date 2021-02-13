const { Brand } = require('../models');

const findAll = () => {
  return Brand.findAll();
};

module.exports = {
  findAll,
};
