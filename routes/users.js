const express = require("express");
const router = express.Router();
const userHandler = require("./handler/user");
const verifyToken = require("../middlewares/verifyToken");
const permission = require("../middlewares/permission");

router.get("/users", verifyToken, permission("admin"), userHandler.getAll);
router.post("/users", userHandler.register);
router.get("/users/:id", verifyToken, permission("admin"), userHandler.get);
router.delete("/users/:id", verifyToken, permission("admin"), userHandler.drop);
router.post("/login", userHandler.login);

module.exports = router;
