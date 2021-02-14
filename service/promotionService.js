const Promotion = require('../models/Promotion.js');

const findAll = () => {
  return Promotion.findAll();
};

const findByBrand = (brandId) => {
  return Promotion.findAll({
    where: { brand_id: brandId },
  });
};

const createAll = async (promotions, brandId) => {
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
  createAll,
};
