const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const electricityRecordsSchema = new mongoose.Schema({
    billId: {
        type: String,
        required: true,
        unique: true
    },
    billDate: {
        type: Date,
        required: true
    },
    billPaidDate: {
        type: Date,
        required: true
    },
    unitConsumed: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

electricityRecordsSchema.plugin(paginate);

module.exports = mongoose.model('ElectricityRecords', electricityRecordsSchema);