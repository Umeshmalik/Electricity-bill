const router = require("express").Router();
const controller = require("./controller")

module.exports = () => {

    router.route("/")
        .post(controller.addBill)
    return router;
}