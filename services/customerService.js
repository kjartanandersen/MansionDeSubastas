const { ObjectID } = require("mongoose/lib/schema/index");
const { Customer, AuctionBid } = require("../data/db");
const mongoose = require('mongoose');
const ObjectId = require("mongoose/lib/schema/objectid");

const customerService = () => {
    const globalTryCatch = async cb => {
        try {
            return await cb();
        } catch (err) {
            return err;
        }
    }

    const getAllCustomers = async (cb, errorCb) => {
        // Your implementation goes here
        return await globalTryCatch(async () => {
            const customers = await Customer.find({});
            return customers;
        })
    };

    const getCustomerById = async (id, cb, errorCb) => {
        // Your implementation goes here
        try {
            const customer = await Customer.findById(id);
            return customer;
        } catch (err) {
            return err;
        }
    };

    const getCustomerAuctionBids = async ( cb, errorCb) => {
        // Your implementation goes here
        // await AuctionBid.find({},  async function (err, auctionBids) {
        //     if ( err ) { errorCb(err); }
        //     else if (auctionBids === undefined || auctionBids.length == 0) { cb(-1); }
        //     else { cb(auctionBids); }
        // });

        return await globalTryCatch(async () => {
            const customers = await AuctionBid.find({});
            return customers;
        })
    };

	const createCustomer = async (customer, cb, errorCb) => {
        // Your implementation goes here
        await Customer.create(customer, function (err, result) {
            if (err) { errorCb(err); }
            else { cb(result); }
        })
    };

    return {
        getAllCustomers,
        getCustomerById,
        getCustomerAuctionBids,
		createCustomer
    };
};

module.exports = customerService();
