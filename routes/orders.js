const express = require("express");
let router = express.Router();
const sequelize = require("sequelize");

const { Orders } = require("../models");

/*
!GET
*/
router.route("/order").get(async (req, res) => {
  try {
    const order = await Orders.findAll();
    if (order.length > 0) {
      res.status(200);
      return res.json(order);
    } else return res.status(200).json({ message: "no records found!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.route("/order/limit").get(async (req, res) => {
  try {
    const order = await Orders.findAll({
      limit: 3,
      order: [["updatedAt", "DESC"]],
    });
    if (order.length > 0) {
      res.status(200);
      return res.json(order);
    } else return res.status(200).json({ message: "no records found!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/*
 *
 */
router.route("/order/deposit").get(async (req, res) => {
  try {
    const order = await Orders.findAll({
      attributes: [[sequelize.fn("sum", sequelize.col("totalPrice")), "total"]],
    });
    console.log(order);
    if (order.length > 0) {
      res.status(200);
      return res.json(order);
    } else
      return res
        .status(404)
        .json({ message: "couldn't find sum of total price" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/*
router.route("/order/deposit").get(async (req, res) => {
  try {
    const order = await Orders.findAll({
      attributes: [
        "productId",
        [sequelize.fn("sum", sequelize.col("totalPrice")), "total"],
      ],
      group: ["productId"],
    });
    console.log(order);
    if (order.length > 0) {
      res.status(200);
      return res.json(order);
    } else return res.status(201).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});*/

router.route("/order/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findOne({
      where: { id },
    });

    return res.status(200).json({
      order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.route("/order/prod/:productId").get(async (req, res) => {
  try {
    const { productId } = req.params;
    const order = await Orders.findAll({
      where: { productId },
    });

    return res.status(200).json({
      order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/* 
!POST
*/

router.route("/order").post(async (req, res) => {
  const {
    productId,
    customer,
    subProduct,
    unitPrice,
    totalPrice,
    quantity,
  } = req.body;
  try {
    const order = await Orders.create({
      productId,
      customer,
      subProduct,
      unitPrice,
      totalPrice,
      quantity,
    });
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
  !DELETE
  */
router.route("/order").delete(async (req, res) => {
  try {
    const order = await Orders.findAll();
    await order.destroy();
    return res.status(200).json({
      message: "All records has been deleted successfully from Orders",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/*
 !DELETE ONE
 */
router.route("/order/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findOne({
      where: { id },
    });

    await order.destroy();

    return res.status(200).json({
      message: "Order Record deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
!UPDATE
*/

router.route("/order/:id").put(async (req, res) => {
  try {
    const {
      productId,
      customer,
      subProduct,
      unitPrice,
      totalPrice,
      quantity,
    } = req.body;
    const { id } = req.params;
    const order = await Orders.findOne({
      where: { id },
    });

    order.productId = productId;
    order.customer = customer;
    order.subProduct = subProduct;
    order.unitPrice = unitPrice;
    order.unitPrice = unitPrice;
    order.totalPrice = totalPrice;
    order.quantity = quantity;
    await order.save();

    return res.status(200).json({
      order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
module.exports = router;
