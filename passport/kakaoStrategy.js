const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../config/.env') });

const User = require('../models/User');

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_KEY,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            profile_id: profile.id,
            provider: 'kakao',
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account.email,
              nickname: profile.displayName,
              provider: 'kakao',
              profile_id: profile.id,
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      },
    ),
  );
};
