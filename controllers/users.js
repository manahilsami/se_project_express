const User = require("../models/user");
const ERROR_CODES = require("../utils/errors");

//GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(ERROR_CODES.OK.code).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message }); //FIX the hard coded 500 error number!
    });
};

//POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST.code)
          .send({ message: ERROR_CODES.BAD_REQUEST.message });
      } else {
        return res
          .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
          .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
      }
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
      } else if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST.code)
          .send({ message: ERROR_CODES.BAD_REQUEST.message });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};

module.exports = { getUsers, createUser, getUser };
