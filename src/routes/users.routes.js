
const express = require("express");
const UserController = require("../controller/users.controller");

const router = express.Router();
const control = new UserController();

router.post("/", control.createUser);

router.get("/", control.getAllUsers);

router.get("/:id", control.getUserById);

router.put("/:id", control.updateUser);

router.patch("/:id/status", control.statusChange);

router.delete("/:id", control.deleteUser);

module.exports = router;
