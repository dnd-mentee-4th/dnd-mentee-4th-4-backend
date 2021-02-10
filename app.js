const express = require('express');
const app = express();

const { sequelize } = require('./models');
const promotionRouter = require('./routes/promotionRouter.js');

const app = express();

app.use('/api', promotionRouter);

sequelize.sync().then(() => {
  app.listen(8080);
});
