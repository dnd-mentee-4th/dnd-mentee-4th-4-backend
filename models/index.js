const Sequelize = require('sequelize');
const Brand = require('./Brand.js');
const Category = require('./Category.js');
const Promotion = require('./Promotion.js');
const User = require('./User.js');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(config);

db.sequelize = sequelize;
db.Brand = Brand;
db.Category = Category;
db.Promotion = Promotion;
db.User = User;

Brand.init(sequelize);
Category.init(sequelize);
Promotion.init(sequelize);
User.init(sequelize);

Brand.associate(db);
Promotion.associate(db);
Category.associate(db);

module.exports = db;
