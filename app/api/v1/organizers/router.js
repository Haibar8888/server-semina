const express = require("express");
const router = express();
const { authenticatedUser } = require("../../../middleware/auth");

// import controller
const { create, createCmsUser } = require("./controller");
router.post("/organizer", create);
router.post("/user", authenticatedUser, createCmsUser);

module.exports = router;
