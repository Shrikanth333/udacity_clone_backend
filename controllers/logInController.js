const user = require('../models/user');
const getAccessToken = require('../authorization/jwtSign.js');
const bcrypt = require('bcrypt');
const signIn = async (body) => {
  const result = await user.findOne({
    $or: [{ 'contact.email': body.email }, { username: body.email }],
  });
  let currentUser = result;

  if (currentUser) {
    let pass = await bcrypt.compare(
      body.password.toString(),
      currentUser.password
    );
    if (pass) {
      const token = getAccessToken(currentUser._id);
      return {
        token: token,
        isAdmin: currentUser.isAdminUser,
        userName: currentUser.username,
      };
    } else return { token: null };
  }
  return { token: undefined };
};

module.exports = { signIn };
