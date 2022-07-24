const { nanoid } = require('nanoid');

const ElectricityRecords = require("../../models/ElectricityRecords")

const addBill = async (req, res) => {
    try{
        const newBill = {
            ...req.body,
            billId: nanoid(18)
        }

        const bill = await ElectricityRecords.create(newBill);
        const responseObject = {
            billId: bill?.billId,
            billDate: bill?.billDate,
            billPaidDate: bill?.billPaidDate,
            unitConsumed: bill?.unitConsumed,
            amount: bill?.amount,
            createdAt: bill?.createdAt,
            updatedAt: bill?.updatedAt
        }

        res.status(201).json({
            message: "Bill created",
            status: 201,
            bill: responseObject
        })
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    addBill
}