const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(403).send(`error : ${error}`);
  }
};
exports.list = async (req, res) => {
  try {
    res.json(await Category.find({}).sort({ createdAt: -1 }));
  } catch (error) {
    console.log(error);
    res.status(403).send(`error : ${error}`);
  }
};
exports.singlecategory = async (req, res) => {
  try {
    res.json(await Category.findOne({ slug: req.params.slug }));
  } catch (error) {
    console.log(error);
    res.status(403).send(`error : ${error}`);
  }
};
exports.update = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(403).send(`error : ${error}`);
  }
};
exports.deletecategory = async (req, res) => {
  try {
    res.json(await Category.findOneAndDelete({ slug: req.params.slug }));
  } catch (error) {
    console.log(error);
    res.status(403).send(`error Delete : ${error}`);
  }
};
