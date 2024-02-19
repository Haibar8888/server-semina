const express = require("express");
const router = express();

// import controller
const { create, index, find, update, destroy } = require("./controller");

router.get("/event", index);
router.get("/event/:id", find);
router.put("/event/:id", update);
router.delete("/event/:id", destroy);
router.post("/event", create);

module.exports = router;
