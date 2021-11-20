module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  console.log('hitting the middleware of isLoggedIn');
  console.log('BEFORE CHECKING req.session.user', req.session.user);
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  console.log('req.session.user', req.session.user);
  req.user = req.session.user;
  next();
};
