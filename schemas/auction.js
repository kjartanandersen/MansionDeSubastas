const { ObjectID, ObjectId } = require('bson');

const Schema = require('mongoose').Schema;

module.exports = new Schema({
    artId: { type: ObjectId, required: true },
    minimumPrice: { type: Number, default: 1000 },
    endDate: { type: Date, required: true },
    auctionWinner: { type: ObjectId }
});
