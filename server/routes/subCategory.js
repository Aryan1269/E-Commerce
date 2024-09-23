const express = require("express");
const C = require("../controller/subCategory");

const router = express.Router();

router.route("/Subcategory").post(C.create).get(C.list);

router
  .route("/Subcategory/:slug")
  .get(C.singlecategory)
  .put(C.update)
  .delete(C.deletecategory);

module.exports = router;
