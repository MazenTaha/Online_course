
const express = require("express");
const {
  createUser,
  getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
 
} = require("../controllers/userController");
const { protect, restrictTo } = require("../controllers/authController");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
// app.use(protect)
// app.use(restrictTo("admin"))
userRouter.post("/", protect, restrictTo("admin"), createUser);
userRouter.delete("/:id", protect, restrictTo("admin"), deleteUser);
userRouter.patch("/:id", protect, restrictTo("admin"), updateUser);

module.exports = userRouter;
