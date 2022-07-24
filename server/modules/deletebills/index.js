const router = require("express").Router();
const controller = require("./controller")

module.exports = () => {

    router.route("/delete/:id")
        .delete(controller.deleteBill)
        
    return router;
}