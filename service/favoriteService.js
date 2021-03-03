const { Favorite } = require('../models');

const findFavoriteBrandByUser = async (profileId) => {
  try {
    return await Favorite.findAll({
      where: {
        user_profile_id: profileId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const createFavorite = async (profileId, brandId) => {
  try {
    await Favorite.create({
      user_profile_id: profileId,
      brand_id: brandId,
    });
    // await db.sequelize.query(
    //   `INSERT INTO zzomsa.Favorite(create_at, update_at, user_profile_id, brand_id) VALUES (now(), now(), '${profileId}', ${brandId});`,
    // );
  } catch (err) {
    console.error(err);
  }
};

const deleteFavorite = async (profileId, brandId) => {
  try {
    await Favorite.destroy({
      where: {
        user_profile_id: profileId,
        brand_id: brandId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  findFavoriteBrandByUser,
  createFavorite,
  deleteFavorite,
};
