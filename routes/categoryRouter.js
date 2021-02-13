const express = require('express');
const categoryService = require('../service/categoryService.js');

const router = express.Router();

router.get('/categories', async (req, res) => {
  const categories = await categoryService.findAll();

  res.status(200).send(categories);
});

module.exports = router;
