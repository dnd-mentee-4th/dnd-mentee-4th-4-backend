const express = require('express');
const { isExistUser, createUser } = require('../service/loginService');

const router = express.Router();

router.post('/', async (req, res) => {
  const result = await isExistUser(req.body.email);
  if (result === -1) {
    res.status(500).end();
  } else if (result === 0) {
    await createUser(req.body);
  }
  const data = {
    isLogged: true,
  };
  await res.json(JSON.stringify(data));
});

module.exports = router;
