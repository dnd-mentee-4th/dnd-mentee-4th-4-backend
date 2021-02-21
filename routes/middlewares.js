const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send(403).send('You are not logged in.');
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const errorMessage = 'You are already logged in.';
    res.redirect(`/?error=${errorMessage}`);
  }
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
};
