const cloudinary = require("cloudinary");
const { json } = require("express");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (req, res) => {
  const { image } = req.body;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`, // Unique public ID based on timestamp
      resource_type: "auto", // Automatically determine resource type
    });

    // Return the result
    return res.status(200).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Failed to upload image.", error: error.message });
  }
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};
