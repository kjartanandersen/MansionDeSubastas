const { ObjectID, ObjectId } = require('bson');

const Schema = require('mongoose').Schema;

module.exports = new Schema({
    title: { type: String, required: true },
    artistId: { type: ObjectId, required: true },
    date: { type: Date, required: true, default: Date.now },
    images: { type: [String] },
    description: { type: String },
    isAuctionItem: {type: Boolean, default: false }
});
