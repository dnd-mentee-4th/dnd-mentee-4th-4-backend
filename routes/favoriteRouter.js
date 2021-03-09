const express = require('express');
const favoriteService = require('../service/favoriteService.js');

const router = express.Router();

router.get('/:profileId/favorites', async (req, res) => {
  const { profileId } = req.params;

  const favorites = await favoriteService.findFavoriteBrandByUser(profileId);

  res.status(200).send(favorites);
});

router.post('/:profileId/favorites', async (req, res) => {
  const { profileId } = req.params;
  const { brandId } = req.body;

  await favoriteService.createFavorite(profileId, brandId);

  res.status(201).send('Hello');
});

router.delete('/:profileId/favorites', async (req, res) => {
  const { profileId } = req.params;
  const { brandId } = req.body;

  await favoriteService.deleteFavorite(profileId, brandId);

  res.status(204).send();
});

module.exports = router;
