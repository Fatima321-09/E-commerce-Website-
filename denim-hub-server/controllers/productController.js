const Product = require("../models/Products");

// @desc Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a product
exports.createProduct = async (req, res) => {
  try {
    const fitValue = req.body.fit ?? req.body.Fit ?? req.body.productFit;
    const genderValue =
      req.body.gender ?? req.body.Gender ?? req.body.productGender;

    const {
      name,
      fit,
      price,
      originalPrice,
      image,
      stock,
      category,
      gender,
      colors,
      sizes,
      waistSizes,
      lengths,
      description,
      specs,
      isNewArrival,
      isSale,
      rating,
      reviews,
    } = req.body;

    const normalizedFit = fit ?? fitValue;
    const normalizedGender = gender ?? genderValue;

    if (!normalizedFit || !normalizedGender) {
      return res.status(400).json({
        message: "fit and gender are required",
      });
    }

    const product = await Product.create({
      name,
      fit: normalizedFit,
      price,
      originalPrice,
      image,
      stock,
      category,
      gender: normalizedGender,
      colors,
      sizes,
      waistSizes,
      lengths,
      description,
      specs,
      isNewArrival,
      isSale,
      rating,
      reviews,
    });
    res.status(201).json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
