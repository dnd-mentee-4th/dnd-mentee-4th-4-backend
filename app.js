const express = require('express');
const app = express();

const { sequelize } = require('./models');
const promotionRouter = require('./routes/promotionRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');
const brandRouter = require('./routes/brandRouter.js');

app.use('/api', promotionRouter);
app.use('/api', categoryRouter);
app.use('/api', brandRouter);

sequelize.sync().then(() => {
  app.listen(8080);
});
