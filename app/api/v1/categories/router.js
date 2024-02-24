const express = require("express");
const router = express();

// import controller
const { create, index, find, update, destroy } = require("./controller");

// middleware user
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middleware/auth");

router.get(
  "/categories",
  authenticatedUser,
  authorizeRoles("organizer"),
  index
);
router.get("/categories/:id", authenticatedUser, find);
router.put("/categories/:id", authenticatedUser, update);
router.delete("/categories/:id", authenticatedUser, destroy);
router.post("/categories", authenticatedUser, create);

module.exports = router;
