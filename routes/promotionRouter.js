const express = require('express');
const promotionService = require('../service/promotionService.js');

const router = express.Router();

router.get('/promotions', async (req, res) => {
  const promotions = await promotionService.findAll();

  res.status(200).send(promotions);
});

router.get('/promotions/:promotionId', async (req, res) => {
  const { promotionId } = req.params;

  const promotions = await promotionService.findByBrand(promotionId);

  res.status(200).send(promotions);
});

module.exports = router;
