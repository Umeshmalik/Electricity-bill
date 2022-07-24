const routes = require("express").Router();
const getBillRoutes = require("./modules/getbills");
const addBillRoutes = require("./modules/addbills");
const editBillRoutes = require("./modules/editbills");
const deleteBillRoutes = require("./modules/deletebills")

module.exports = () => 
    routes
        .get('/health-check', (req, res) => {
            res.status(200).json({
                message: "Yee! Server is running",
                status: 200
            })
        })
        .use(getBillRoutes())
        .use(addBillRoutes())
        .use(editBillRoutes())
        .use(deleteBillRoutes())
        .all('*', (req, res) => {
            res.status(404).json({
                message: "Sorry! This address doesn't exist",
                status: 404
            })
        })
