const express = require("express");
const orders = require("../controllers/order.controller");

const router = express.Router();

router.route("/")

    .get(orders.findAll)
    .post(orders.create)
    .delete(orders.deleteAll);

router.route("/:id")
    .get(orders.findOne)
    .put(orders.update)
    .delete(orders.delete);

module.exports = router;