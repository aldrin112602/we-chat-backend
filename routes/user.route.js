const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");

const {
  signIn,
  signUp
} = require("../controllers/user_auth.controller.js");


router.post("/signIn", signIn);
router.post("/signUp", signUp);

// router.get("/", getUsers);
// router.get("/:id", getUser);
// router.post("/", createUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

module.exports = router;
