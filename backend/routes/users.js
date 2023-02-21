const express = require("express");
const router = express.Router();
const { login, logout, register } = require("../controllers/users");

router.post("/login", (req, res) => login(req, res));
router.post("/logout", (req, res) => logout(req, res));
router.post("/register", (req, res) => register(req, res));

module.exports = router;
