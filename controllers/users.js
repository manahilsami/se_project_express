const User = require("../models/user");
const ERROR_CODES = require("../utils/errors");
const bcrypt = require("bcryptjs");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(ERROR_CODES.OK.code).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => res.status(ERROR_CODES.CREATED.code).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST.code)
          .send({ message: ERROR_CODES.BAD_REQUEST.message });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: "Email already exists" });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND.code)
          .send({ message: ERROR_CODES.NOT_FOUND.message });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST.code)
          .send({ message: ERROR_CODES.BAD_REQUEST.message });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  return User.findUserbyCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(ERROR_CODES.OK.code).send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res.status(401).send({ message: "Incorrect email or password" });
      }
      return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR.code).send({
        message: ERROR_CODES.INTERNAL_SERVER_ERROR.message,
      });
    });
};

module.exports = { getUsers, createUser, getUser, loginUser };
