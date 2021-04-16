const express = require("express");
const Sequelize = require("sequelize");
const { sequelize } = require("./models");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
const Orders = require("./routes/orders");
const Products = require("./routes/product");
const Profits = require("./routes/profits");
const Annual = require("./routes/annual");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/cosmetics/orders", Orders);
app.use("/cosmetics/products", Products);
app.use("/cosmetics/profits", Profits);
app.use("/cosmetics/annuals", Annual);

app.get("/", (req, res) => {
  res.send("HEY SEXY I'M EVELYN");
});

app.get;

app.listen(port, async () => {
  console.log(`up and running on port ${port}`);
  await sequelize.sync({
    force: true,
  });
});
