const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateClothingItem,
  validateClothingItemId,
} = require("../middlewares/validation");

router.post("/", validateClothingItem, createItem);
router.delete("/:itemId", validateClothingItemId, deleteItem);
router.put("/:itemId/likes", validateClothingItemId, likeItem);
router.delete("/:itemId/likes", validateClothingItemId, dislikeItem);

module.exports = router;
