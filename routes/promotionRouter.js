const express = require('express');
const promotionService = require('../service/promotionService.js');

const router = express.Router();

router.get('/brands/promotions', async (req, res) => {
  const { size, page } = req.query;
  const promotions = await promotionService.findAll(page, size);

  res.status(200).send(promotions);
});

router.get('/brands/:brandId/promotions', async (req, res) => {
  const { brandId } = req.params;
  const { size, page } = req.query;
  const promotions = await promotionService.findByBrand(brandId, page, size);

  res.status(200).send(promotions);
});

module.exports = router;
