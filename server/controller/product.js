const slugify = require("slugify");
const product = require("../models/product");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);

    const newProduct = new product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).send("Create product failed");
  }
};

exports.listall = async (req, res) => {
  try {
    const rs = await product
      .find({})
      .limit(req.params.count)
      .populate("category")
      .populate("subs")
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(rs);
  } catch (error) {
    res.status(400).send("read product failed");
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(await product.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.json({
      error,
    });
  }
};

exports.singleitem = async (req, res) => {
  try {
    const rs = await product
      .findById(req.params.id)
      .populate("category")
      .populate("subs");
    res.json(rs);
  } catch (error) {
    res.json({
      err: error,
    });
  }
};

//pagination
exports.pagination = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 1;
  const skip = (page - 1) * limit;

  try {
    const products = await product.find({}).skip(skip).limit(limit);
    const totalProducts = await product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
