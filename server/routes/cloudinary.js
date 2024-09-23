const express = require("express");
const { upload, remove } = require("../controller/cloudinary");

const router = express.Router();

router.post("/save/images", upload);

router.post("/remove/save/image", remove);

module.exports = router;
