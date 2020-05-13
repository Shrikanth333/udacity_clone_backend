const jwt = require('jsonwebtoken');
const getAccessToken = (currentUserId) =>
  jwt.sign({ _id: currentUserId }, 'secret_key');

module.exports = getAccessToken;
