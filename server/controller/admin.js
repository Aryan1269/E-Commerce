const Category = require("../models/category");
const slugify = require("slugify");
const subCategory = require("../models/subCategory");

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
    res.json(await Category.findOne({ name: req.params.slug }));
  } catch (error) {
    console.log(error);
    res.status(403).send(`error : ${error}`);
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.params.slug);
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

exports.subs = async (req, res) => {
  try {
    const sub = await subCategory.find({ parent: req.params.id });
    res.json(sub);
  } catch (error) {
    res.json({
      error : error,
    })
  }
};
