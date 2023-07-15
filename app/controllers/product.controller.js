const db = require("../models/index");
const Product = db.product;
const { Op } = require("sequelize");

const getAllProducts = async (req, res) => {
  try {
    const { page, pageSize, search } = req.query;
    const limit = pageSize ? parseInt(pageSize) : 10;
    const offset = page ? (parseInt(page) - 1) * limit : 0;

    const whereCondition = search
      ? {
          [Op.or]: [
            { productName: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const products = await Product.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
    });

    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: page ? parseInt(page) : 1,
      pageSize: limit,
      items: products.rows,
    });
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy sản phẩm." });
  }
};

module.exports = {
  getAllProducts
};