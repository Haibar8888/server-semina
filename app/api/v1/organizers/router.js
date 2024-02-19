const express = require("express");
const router = express();

// import controller
const { create } = require("./controller");
router.post("/organizer", create);

module.exports = router;
