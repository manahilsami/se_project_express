const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createUser, loginUser } = require("../controllers/users");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.get("/items", clothingItemsRouter);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;
