const router = require('express').Router()
const controller = require("./controller")

module.exports = () => {

    router.route("/")
        .get(controller.getBills)
    
    router.route('/bill/:id')
        .get(controller.getBill)

    return router;
}