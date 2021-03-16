const Promotion = require('../models/Promotion.js');

const findAll = (page, size) => {
  return Promotion.findAll({
    limit: size ? +size : 0,
    offset: page ? (page - 1) * size : 0,
  });
};

const findByBrand = (brandId, page, size) => {
  return Promotion.findAll({
    where: { brand_id: brandId },
    limit: size ? +size : 0,
    offset: page ? (page - 1) * size : 0,
  });
};

const createAll = async (promotions, brand) => {
  const savedPromotions = promotions.forEach((promotion) => {
    const promotionJson = JSON.parse(promotion);

    const createdPromotion = {
      title: promotionJson.title,
      description: promotionJson.description,
      image: promotionJson.image,
      url: promotionJson.url,
      brandId: brand.id,
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
