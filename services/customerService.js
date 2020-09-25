const { Customer } = require("../data/db");

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

    const getCustomerAuctionBids = async (customerId, cb, errorCb) => {
        // Your implementation goes here
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
