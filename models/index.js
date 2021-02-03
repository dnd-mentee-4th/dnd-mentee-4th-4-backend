const Sequelize = require('sequelize');
const Brand = require('./Brand');
const Category = require('./Category');
const Promotion = require('./Promotion');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config);

db.sequelize = sequelize;
db.Brand = Brand;
db.Category = Category;
db.Promotion = Promotion;

Brand.init(sequelize);
Category.init(sequelize);
Promotion.init(sequelize);

Brand.associate(db);
Category.associate(db);

module.exports = db;
