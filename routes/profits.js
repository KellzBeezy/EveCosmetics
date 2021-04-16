const express = require("express");
let router = express.Router();

const { Profit, Product } = require("../models");

/*
!GET
*/
router.route("/profit").get(async (req, res) => {
  try {
    const profit = await Profit.findAll({ order: ["createdAt"] });
    if (profit.length > 0) {
      res.status(200);
      return res.json(profit);

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
router.route("/profit/sum").get(async (req, res) => {
  try {
    const profit = await Profit.findAll();
    if (profit.length > 0) {
      res.status(200);

      return res.json("chill");

      //;
    } else return res.status(404).json({ message: "no records found!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/profit/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const profit = await Profit.findOne({
      where: { id },
    });

    return res.status(200).json({
      profit,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/* 
  !POST
  */

router.route("/profit").post(async (req, res) => {
  const { year, month, capital, profit } = req.body;
  try {
    const data = await Profit.create({
      year,
      month,
      capital,
      profit,
    });
    return res.status(200).json([data]);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
    !DELETE
 */
router.route("/profit").delete(async (req, res) => {
  try {
    const profit = await Profit.findAll();
    await profit.destroy({ force: true });
    return res.status(200).json({
      message: "All records has been deleted successfully from Profit",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/*
   !DELETE ONE
 */
router.route("/profit/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const profit = await Profit.findOne({
      where: { id },
    });

    await profit.destroy();

    return res.status(200).json({
      message: "Profit Record deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/*
  !UPDATE
*/

router.route("/profit/:id").put(async (req, res) => {
  try {
    const { year, month, capital, profit } = req.body;
    const { id } = req.params;
    const data = await Profit.findOne({
      where: { id },
    });

    data.year = year;
    data.month = month;
    data.capital = capital;
    data.profit = profit;

    await data.save();

    return res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
