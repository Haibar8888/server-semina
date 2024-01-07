const express = require("express");
const router = express();

router.get("/categories", (req, res) => {
  res.status(202).json({
    message: "halaman categories",
  });
});

module.exports = router;
