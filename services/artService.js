
const Art = require('../data/db').Art;
const Artist = require('../data/db').Artist;

const artService = () => {

    const globalTryCatch = async cb => {
        try {
            return await cb();
        } catch (err) {
            return err;
        }
    }

    const getAllArts = async (cb, errorCb) => {
        // Your implementation goes here
        return await globalTryCatch(async () => {
            const arts = await Art.find({});
            return arts;
        })
    };

    const getArtById = async (id, cb, errorCb) => {
        // Your implementation goes here
        try {
            const art = await Art.findById(id);
            return art;
        } catch (err) {
            return err;
        }
    };

    const createArt = async (art, cb, errorCb) => {
        // Your implementation goes here

        await Artist.findById(art.artistId, function (err, artist) {
            if (artist === null) { cb(-1); }
            else {
                Art.create(art, function (err, result) {
                    if (err) { errorCb(err); }
                    else { cb(result); }
                })
            }
        })
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
