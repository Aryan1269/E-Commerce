const express = require("express");
const {
  create,
  listall,
  remove,
  singleitem,
  pagination,
} = require("../controller/product");
const router = express.Router();

router.post("/product", create);
router.get("/product/:count", listall);
router.delete("/product/:id", remove);
router.get("/products/:id", singleitem);
router.get("/product", pagination);

module.exports = router;
