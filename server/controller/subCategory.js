const Subcategory = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const category = await new Subcategory({
      name,
      slug: slugify(name),
      parent,
    }).save();

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(403).send(`error : ${error}`);
  }
};
exports.list = async (req, res) => {
  try {
    res.json(await Subcategory.find({}).sort({ createdAt: -1 }));
  } catch (error) {
    console.log(error);
    res.status(403).send(`error : ${error}`);
  }
};
exports.singlecategory = async (req, res) => {
  try {
    res.json(await Subcategory.findOne({ slug: req.params.slug }));
  } catch (error) {
    console.log(error);
    res.status(403).send(`error : ${error}`);
  }
};
exports.update = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Subcategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent },
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
    res.json(await Subcategory.findOneAndDelete({ slug: req.params.slug }));
  } catch (error) {
    console.log(error);
    res.status(403).send(`error Delete : ${error}`);
  }
};
