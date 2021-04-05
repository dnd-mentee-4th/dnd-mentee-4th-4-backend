const { Brand } = require('../models');

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

module.exports = {
  findAll,
  findByName,
};
