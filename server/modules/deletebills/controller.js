const ElectricityRecords = require("../../models/ElectricityRecords")

const deleteBill = async ( req, res) => {
    try{
        const { id } = req.params;
        const isDeleted = await ElectricityRecords.deleteMany({billId: id});
        res.status(200).json({
            message: "Bill is deleted",
            status: 200,
            billId: id
        })
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    deleteBill
}