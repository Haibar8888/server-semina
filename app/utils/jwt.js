const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../../app/config");

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = { createJwt, isTokenValid };
