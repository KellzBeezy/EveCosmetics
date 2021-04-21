const express = require("express");
let router = express.Router();
const sequelize = require("sequelize");

const { Product, Orders } = require("../models");

/*
!GET
*/
router.route("/product").get(async (req, res) => {
  try {
    let ord = [];
    const product = await Product.findAll({ group: ["id"] });
    if (product.length > 0) {
      res.status(200);
      return res.json({ product, ord });

      //;
    } else return res.status(404).json({ message: "no records found!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
! 
*/
router.route("/product/deposit").get(async (req, res) => {
  try {
    const capital = await Product.findAll({
      attributes: [
        [sequelize.fn("sum", sequelize.col("profit")), "totalCapital"],
      ],
    });
    if (capital.length > 0) {
      res.status(200);
      return res.json(capital);

      //;
    } else return res.status(404).json({ message: "no records found!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/product/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });

    return res.status(200).json({
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/* 
  !POST
  */

router.route("/product").post(async (req, res) => {
  const { capital, productName, quantity, remaining, revenue } = req.body;
  try {
    const products = await Product.create({
      capital,
      productName,
      remaining,
      revenue,
      quantityOrdered: quantity,
    });
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
    !DELETE
    */
router.route("/product").delete(async (req, res) => {
  try {
    const product = await Product.findAll();
    await product.destroy({ force: true });
    return res.status(200).json({
      message: "All records has been deleted successfully from Products",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/*
   !DELETE ONE
   */
router.route("/product/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });

    await product.destroy();

    return res.status(200).json({
      message: "Product Record deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
  !UPDATE
  */

router.route("/product/:id").put(async (req, res) => {
  try {
    const { profit, product, remaining, revenue } = req.body;
    const { id } = req.params;
    const products = await Product.findOne({
      where: { id },
    });

    products.productName = product;
    products.profit = profit;
    products.remaining = remaining;
    products.revenue = revenue;

    await products.save();

    return res.status(200).json({
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
