const { Artist } = require("../data/db");
const art = require("../schemas/art");

const artistService = () => {
    const globalTryCatch = async cb => {
        try {
            return await cb();
        } catch (err) {
            return err;
        }
    }

    const getAllArtists = async (cb, errorCb) => {
        // Your implementation goes here
        return await globalTryCatch(async () => {
            const artists = await Artist.find({});
            return artists;
        })
    };

    const getArtistById = async (id, cb, errorCb) => {
        // Your implementation goes here
        try {
            const artist = await Artist.findById(id);
            return artist;
        } catch (err) {
            return err;
        }
    };

    const createArtist = async (artist, cb, errorCb) => {
        // Your implementation goes here
        await Artist.create(artist, function (err, result) {
            if (err) { errorCb(err); }
            else { cb(result); }
        })
    };

    return {
        getAllArtists,
        getArtistById,
        createArtist
    };
};

module.exports = artistService();
