const { ObjectId } = require('bson');

const Schema = require('mongoose').Schema;

module.exports = new Schema({
    auctionId: { type: ObjectId, required: true },
    customerId: { type: ObjectId, required: true },
    price: { type: Number, required: true }
});
