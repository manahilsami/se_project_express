const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const ERROR_CODES = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR_CODES.UNAUTHORIZED.code)
      .send({ message: ERROR_CODES.UNAUTHORIZED.message });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(ERROR_CODES.UNAUTHORIZED.code)
      .send({ message: ERROR_CODES.UNAUTHORIZED.message });
  }

  req.user = payload;
  return next();
};

module.exports = auth;
