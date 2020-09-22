const collections = require('./collection')
const mongoDb = require('mongodb');
const Progress = require('cli-progress');
const chalk = require('chalk');
const MongoClient = mongoDb.MongoClient;

const connectionString = 'mongodb+srv://dbAdmin:Pass.123@kjartancluster.mdfwu.mongodb.net/mansion_de_subastas';

const dbName = connectionString.split('/').slice(-1)[0];

// Holds the mappings between internal ids and _id generated by MongoDb
const relationsMap = {
    customers: {},
    auctionBids: {},
    auctions: {},
    arts: {},
    artists: {}
};

const printProgressStatement = text => {
    console.log(chalk.bold.white.bgRgb(246, 91, 227)(text));
}

(async () => {
    const progressBar = new Progress.SingleBar({
        stopOnComplete: true
    }, Progress.Presets.rect);

    const client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const database = client.db(dbName);

    const arts = database.collection('arts');
    const artists = database.collection('artists');
    const customers = database.collection('customers');
    const auctions = database.collection('auctions');
    const auctionBids = database.collection('auctionBids');

    const numberToPopulate = (await Promise.all([ arts.countDocuments(), artists.countDocuments(), customers.countDocuments(), auctions.countDocuments(), auctionBids.countDocuments() ])).reduce((sum, elem) => elem === 0 ? sum + 1 : sum, 0);

    if (numberToPopulate === 0) {
        printProgressStatement('Database already populated.');
        client.close();
        return;
    } else {
        progressBar.start(numberToPopulate, 0);
    }

    // Populate the customers list
    if (await customers.countDocuments() === 0) {
        await Promise.all(collections.customers.map(async c => {
            const { name, username, email, address } = c;
            const result = await customers.insertOne({
                name,
                username,
                email,
                address
            });

            // Add to map
            relationsMap.customers[c.id] = result.insertedId;
        }));

        progressBar.increment();
    };

    // Populate artists
    if (await artists.countDocuments() === 0) {
        await Promise.all(collections.artists.map(async a => {
            const { name, nickname, address, memberSince } = a;
            const result = await artists.insertOne({
                name,
                nickname,
                address,
                memberSince
            });

            // Add to map
            relationsMap.artists[a.id] = result.insertedId;
        }));

        progressBar.increment();
    };

    // Populate arts
    if (await arts.countDocuments() === 0) {
        await Promise.all(collections.arts.map(async a => {
            const { images, isAuctionItem, title, artistId, date, description } = a;
            const result = await arts.insertOne({
                images,
                isAuctionItem,
                title,
                artistId: relationsMap.artists[artistId],
                date,
                description
            });

            // Add to map
            relationsMap.arts[a.id] = result.insertedId;
        }));

        progressBar.increment();
    }

    // Populate auctions
    if (await auctions.countDocuments() === 0) {
        await Promise.all(collections.auctions.map(async a => {
            const { id, artId, minimumPrice, endDate } = a;
            const result = await auctions.insertOne({
                artId: relationsMap.arts[artId],
                minimumPrice,
                endDate
            });

            // Add to map
            relationsMap.auctions[a.id] = result.insertedId;
        }));

        progressBar.increment();
    };

    // Populate auction bids
    if (await auctionBids.countDocuments() === 0) {
        await Promise.all(collections.auctionBids.map(async a => {
            const { auctionId, customerId, price } = a;
            const result = await auctionBids.insertOne({
                auctionId: relationsMap.auctions[auctionId],
                customerId: relationsMap.customers[customerId],
                price
            });

            // Add to map
            relationsMap.auctionBids[a.id] = result.insertedId;
        }));

        progressBar.increment();
    };

    printProgressStatement('Database has been successfully populated!');

    client.close();
})();