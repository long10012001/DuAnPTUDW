const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .get(users.findAll)
    .post(users.create)
    .delete(users.deleteAll);

router.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete);

router.route("/logincheck")
    .post(users.login);

router.route("/regist/:email")
    .get(users.getEmail)
router.route("/regist")
    .post(users.create);
module.exports = router;