const { User } = require('../models');

const isExistUser = async (currUserProfileId) => {
  try {
    const currUser = await User.findOne({
      where: { profile_id: currUserProfileId },
    });
    if (currUser) {
      // 일치하는 email을 가진 User를 찾은 경우
      return 1;
    }
    // 일치하는 email을 가진 User를 찾지 못한 경우
    return 0;
  } catch (err) {
    console.error(err);
    // DB SELECT 과정에서 문제가 발생했을 경우
    return -1;
  }
};

const createUser = async (user) => {
  try {
    await User.create({
      email: null,
      nickname: user.nickname,
      provider: 'kakao',
      profile_id: user.profile_id,
    });
  } catch (err) {
    // DB INSERT 과정에서 문제가 발생했을 경우
    console.error(err);
  }
};

module.exports = {
  isExistUser,
  createUser,
};
