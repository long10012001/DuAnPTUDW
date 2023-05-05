const express = require("express");
const products = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
    .get(products.findAllCategory)
    .get(products.findAll)
    .post(products.create)


router.route("/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(products.delete);

// router.route("/category/:category").get(products.findAll);

module.exports = router;