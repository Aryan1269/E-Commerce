const express = require("express");
const C = require("../controller/admin");

const router = express.Router();

router.route("/category").post(C.create).get(C.list);

router
  .route("/category/:slug")
  .get(C.singlecategory)
  .put(C.update)
  .delete(C.deletecategory);


router.get('/category/sub/:id',C.subs);

module.exports = router;
