const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createUser, loginUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const {
  validateUserInfo,
  userLogInAuthentication,
} = require("../middlewares/validation");
const { NotFoundError } = require("../utils/customErrors");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.post("/signup", validateUserInfo, createUser);
router.post("/signin", userLogInAuthentication, loginUser);
router.get("/items", getItems);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
