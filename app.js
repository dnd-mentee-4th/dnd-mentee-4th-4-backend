const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, 'config/.env') });

const authRouter = require('./routes/auth.js');
const passportConfig = require('./passport');

const { sequelize } = require('./models');
const promotionRouter = require('./routes/promotionRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');
const brandRouter = require('./routes/brandRouter.js');
const indexRouter = require('./routes/indexRouter.js');

const app = express();
passportConfig();

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api', [promotionRouter, categoryRouter, brandRouter]);
app.use('/', indexRouter);

sequelize.sync().then(() => {
  app.listen(8080);
});
