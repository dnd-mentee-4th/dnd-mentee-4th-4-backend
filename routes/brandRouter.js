const express = require('express');
const brandService = require('../service/brandService.js');

const router = express.Router();

router.get('/brands', async (req, res) => {
  const brands = await brandService.findAll();

  res.status(200).send(brands);
});

router.get('/brands/search', async (req, res) => {
  const brands = await brandService.searchByName(req.query.name);

  res.status(200).send(brands);
});

module.exports = router;
