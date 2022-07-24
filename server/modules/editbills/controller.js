const ElectricityRecords = require("../../models/ElectricityRecords");

const editBill = async (req, res) => {
    try {
        const {id} = req.params;
        const { billDate = "", billPaidDate = "", unitConsumed = "", amount = "" } = req.body.data;
        const updateObject = {
            billDate,
            billPaidDate,
            unitConsumed,
            amount,
            updatedAt: new Date().toISOString()
        }
        const isUpdated = await ElectricityRecords.updateOne({billId: id}, {
            $set: updateObject
        })
        res.status(200).json({
            message: 'Bill is updated',
            status: 200,
            billId: id,
            isUpdated
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    editBill
}