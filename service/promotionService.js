const promotion = require('../models/Promotion.js');
const { Promotion } = require('../models');

const findAll = () => {
  return promotion.findAll();
};

const findByBrand = (brandId) => {
  return promotion.findAll({
    where: { brand_id: brandId },
  });
};

const bulkCreate = async (promotions, brandId) => {
  const savedPromotions = promotions.forEach((promotion) => {
    const promotionJson = JSON.parse(promotion);

    const createdPromotion = {
      title: promotionJson.title,
      description: promotionJson.description,
      image: promotionJson.image,
      url: promotionJson.url,
      brandId,
    };

    try {
      Promotion.create(createdPromotion);
    } catch (e) {
      console.log(e);
    }
  });

  return savedPromotions;
};

module.exports = {
  findAll,
  findByBrand,
  bulkCreate
};
