const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/customErrors");
const ERROR_CODES = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(ERROR_CODES.CREATED.code).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data passed to create item"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(ERROR_CODES.OK.code).send(items))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(currentUserId)) {
        throw new ForbiddenError(
          "You do not have permission to delete this item"
        );
      }

      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) => {
        res.status(ERROR_CODES.OK.code).send(deletedItem);
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(ERROR_CODES.OK.code).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(ERROR_CODES.OK.code).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};
module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
