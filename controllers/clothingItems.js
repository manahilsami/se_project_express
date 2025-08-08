const ClothingItem = require("../models/clothingItem");
const ERROR_CODES = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(ERROR_CODES.CREATED.code).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST.code)
          .send({ message: ERROR_CODES.BAD_REQUEST.message });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(ERROR_CODES.OK.code).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(currentUserId)) {
        return res
          .status(ERROR_CODES.FORBIDDEN.code)
          .send({ message: ERROR_CODES.FORBIDDEN.message });
      }

      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) => {
        res.status(ERROR_CODES.OK.code).send(deletedItem);
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST.code)
          .send({ message: ERROR_CODES.BAD_REQUEST.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND.code)
          .send({ message: ERROR_CODES.NOT_FOUND.message });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(ERROR_CODES.OK.code).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST.code)
          .send({ message: ERROR_CODES.BAD_REQUEST.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND.code)
          .send({ message: ERROR_CODES.NOT_FOUND.message });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(ERROR_CODES.OK.code).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST.code)
          .send({ message: ERROR_CODES.BAD_REQUEST.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND.code)
          .send({ message: ERROR_CODES.NOT_FOUND.message });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR.code)
        .send({ message: ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    });
};
module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
