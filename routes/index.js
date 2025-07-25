const router = require("express").Router();
const ERROR_CODES = require("../utils/errors");
const { createUser, loginUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.get(require("./clothingItems"));

router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.use((req, res) => {
  res
    .status(ERROR_CODES.NOT_FOUND.code)
    .send({ message: ERROR_CODES.NOT_FOUND.message });
});

module.exports = router;
