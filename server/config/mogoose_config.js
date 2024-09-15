const mongoose = require("mongoose");

mongoose
  // @ts-ignore
  .connect(process.env.MONGOOSE_URL)
  .then((_) => console.log("db connected"))
  .catch((e) => console.log(e));


module.exports = mongoose;