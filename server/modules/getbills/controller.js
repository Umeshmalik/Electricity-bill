const ElectricityRecords = require("../../models/ElectricityRecords")

const getBills = async (req, res) => {
    try {
        let { page = 1, limit = 9, sort = 'billId' } = req.query;

        const options = {
            page: page || 1,
            limit: limit || 10,
            sort,
            select: ""
        };

        const bills = await ElectricityRecords.paginate({}, options)

        res.status(200).json({
            data: bills, 
            status: 200
        })
    } catch (error) {
        throw new Error(error);
    }
}

const getBill = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ElectricityRecords.findOne({billId: id}, {_id: 0, __v: 0})
        res.status(200).json({
            message: "we got one bill",
            status: 200,
            data
        })
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getBills,
    getBill
}