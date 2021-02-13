const express = require('express');
const app = express();

const { sequelize } = require('./models');
const promotionRouter = require('./routes/promotionRouter.js');
const categoryRouter = require('./routes/categoryRouter');

app.use('/api', promotionRouter);
app.use('/api', categoryRouter);

sequelize.sync().then(() => {
  app.listen(8080);
});
