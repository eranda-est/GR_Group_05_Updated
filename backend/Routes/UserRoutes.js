const express = require("express");
const {registerUser} = require('../controllers/UserControllers');

const router = express.Router();

router.post("/signup",registerUser);

module.exports = router;