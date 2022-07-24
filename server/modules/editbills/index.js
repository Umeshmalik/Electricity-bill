const router = require("express").Router();
const controller = require("./controller")

module.exports = () => {

    router.route("/:id/edit")
        .put(controller.editBill)

    return router;
}