import Product from "../model/product.model.js";

export const createProduct = async (req, res) => {
  const { name, price, category, type, userId } = req.body;
  if (!name || !price || !category || !type || !userId)
    return res
      .status(400)
      .send({ success: false, message: "All the fields are required" });
  try {
    const product = await Product.create({
      name,
      price,
      category,
      type,
      userId,
    });
    if (!product)
      return res
        .status(400)
        .send({ success: false, message: "Failed to create product" });
    res.status(201).send({ success: true, product });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};


export const getProducts = async (req, res) => {
  const filter = req.query;
  const { maxPrice = 500000, minPrice = 0 } = req.query;

  for (const key in filter) {
    const isValidQuery = ["type", "category", "name"].includes(key);
    if (!isValidQuery || filter[key] == undefined || filter[key] === "") {
      delete filter[key];
    }
  }

  try {
    const products = await Product.find({
      ...filter,
      price: {
        $lte: Number(maxPrice),
        $gte: Number(minPrice),
      },
    });

    if (!products || products.length === 0)
      return res
        .status(400)
        .send({ success: false, message: "No products found" });

    res.status(200).send({ success: true, products });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};


export const getProductsBySeller = async (req, res) => {
  const { userId } = req.params;
  try {
    const products = await Product.find({
      userId,
    });

    if (!products || products.length === 0)
      return res
        .status(400)
        .send({ success: false, message: "No products found" });

    res.status(200).send({ success: true, products });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

export const searchProducts = async (req, res) => {
  const { searchQuery } = req.query;
  console.log(searchQuery);
  try {
    const products = await Product.find({
      $text: { $search: searchQuery },
    });
    console.log(products);
    if (!products || products.length === 0)
      return res
        .status(400)
        .send({ success: false, message: "No products found" });

    res.status(200).send({ success: true, products });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;
  try {
    const product = await Product.findByIdAndDelete({ _id: productId, userId });
    if (!product)
      return res
        .status(400)
        .send({ success: false, message: "No product found with this id" });
    res.status(200).send({ success: true, product });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { type, name, category, price, userId } = req.body;
  const productObj = { type, name, category, price };
  for (const key in productObj) {
    if (productObj[key] == undefined || productObj[key] === "") {
      delete productObj[key];
    }
  }
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId, userId },
      productObj,
      { new: true }
    );
    if (!product)
      return res
        .status(400)
        .send({ success: false, message: "No product found with this id" });
    res.status(200).send({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
};
