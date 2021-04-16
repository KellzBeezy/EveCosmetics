const express = require("express");
let router = express.Router();
const sequelize = require("sequelize");

const { Annual } = require("../models");

/*
!GET
*/
router.route("/annual").get(async (req, res) => {
  try {
    const annual = await Annual.findAll();
    if (annual.length > 0) {
      res.status(200);
      return res.json(annual);
    } else return res.status(200).json({ message: "no records found!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.route("/annual/limit").get(async (req, res) => {
  try {
    const annual = await Annual.findAll({
      limit: 3,
      order: [["updatedAt", "DESC"]],
    });
    if (annual.length > 0) {
      res.status(200);
      return res.json(annual);
    } else return res.status(200).json({ message: "no records found!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/*
 *
 */
router.route("/annual/deposit").get(async (req, res) => {
  try {
    const annual = await Annual.findAll({
      attributes: [[sequelize.fn("sum", sequelize.col("totalPrice")), "total"]],
    });
    console.log(annual);
    if (annual.length > 0) {
      res.status(200);
      return res.json(annual);
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
router.route("/annual/deposit").get(async (req, res) => {
  try {
    const annual = await Annual.findAll({
      attributes: [
        "productId",
        [sequelize.fn("sum", sequelize.col("totalPrice")), "total"],
      ],
      group: ["productId"],
    });
    console.log(annual);
    if (annual.length > 0) {
      res.status(200);
      return res.json(annual);
    } else return res.status(201).json(annual);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});*/

router.route("/annual/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const annual = await Annual.findOne({
      where: { id },
    });

    return res.status(200).json({
      annual,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.route("/annual/prod/:productId").get(async (req, res) => {
  try {
    const { productId } = req.params;
    const annual = await Annual.findAll({
      where: { productId },
    });

    return res.status(200).json({
      annual,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/* 
!POST
*/

router.route("/annual").post(async (req, res) => {
  const { year, initialProfit, currentProfit } = req.body;
  try {
    const annual = await Annual.create({
      year,
      initialProfit,
      currentProfit,
    });
    return res.status(200).json(annual);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
  !DELETE
  */
router.route("/annual").delete(async (req, res) => {
  try {
    const annual = await Annual.findAll();
    await annual.destroy();
    return res.status(200).json({
      message: "All records has been deleted successfully from Annual",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/*
 !DELETE ONE
 */
router.route("/annual/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const annual = await Annual.findOne({
      where: { id },
    });

    await annual.destroy();

    return res.status(200).json({
      message: "Annual Record deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
!UPDATE
*/

router.route("/annual/:id").put(async (req, res) => {
  try {
    const { year, initialProfit, currentProfit } = req.body;
    const { id } = req.params;
    const annual = await Annual.findOne({
      where: { id },
    });

    annual.year = year;
    annual.initialProfit = initialProfit;
    annual.currentProfit = currentProfit;

    await annual.save();

    return res.status(200).json({
      annual,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
module.exports = router;
