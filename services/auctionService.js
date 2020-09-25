const { Auction } = require("../data/db");

const auctionService = () => {
    const globalTryCatch = async cb => {
        try {
            return await cb();
        } catch (err) {
            return err;
        }
    }

    const getAllAuctions = async (cb, errorCb) => {
        // Your implementation goes here
        return await globalTryCatch(async () => {
            const auctions = await Auction.find({});
            return auctions;
        })
    };

    const getAuctionById = async (id, cb, errorCb) => {
        // Your implementation goes here
        try {
            const auction = await Auction.findById(id);
            return auction;
        } catch (err) {
            return err;
        }
    };

    const getAuctionWinner = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const createAuction = (auction, cb, errorCb) => {
        // Your implementation goes here
    };

	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
		// Your implementation goes here
	}

    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
		createAuction,
		getAuctionBidsWithinAuction,
		placeNewBid
    };
};

module.exports = auctionService();
