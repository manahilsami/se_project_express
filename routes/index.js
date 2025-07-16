const router = require("express").Router();
const ERROR_CODES = require("../utils/errors");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.use((req, res) => {
  res
    .status(ERROR_CODES.NOT_FOUND.code)
    .send({ message: ERROR_CODES.NOT_FOUND.message });
});

module.exports = router;
