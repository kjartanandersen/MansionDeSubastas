// Here the web service should be setup and routes declared
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const artService = require('./services/artService');

app.use(bodyParser.json());

// http://localhost:3000/api/arts [GET]
app.get('/api/arts', async function(req, res) {
    const result = await artService.getAllArts();
    return res.json(result);
});

// http://localhost:3000/api/arts/1 [GET]
app.get('/api/arts/:id', async function(req, res) {
    const artId = req.params.id;
    const result = await artService.getArtById(artId);
    return res.json(result);
});

// http://localhost:3000/api/arts [POST]
app.post('/api/arts', async function(req, res) {
    const art = req.body;
    await artService.createArt(art, function (art) {
        return res.status(204).send(); 
    }, function (err) {
        return res.status(400).send(err);
    });
});

// http://localhost:3000/api/artists [GET]
app.get('/api/artists', async function(req, res) {

});

// http://localhost:3000/api/artists/1 [GET]
app.get('/api/artists/:id', async function(req, res) {

});

// http://localhost:3000/api/artists [POST]
app.post('/api/artists', async function(req, res) {

});

// http://localhost:3000/api/customers [GET]
app.get('/api/customers', async function(req, res) {

});

// http://localhost:3000/api/customers/1 [GET]
app.get('/api/customers/:id', async function(req, res) {

});

// http://localhost:3000/api/customers [POST]
app.post('/api/customers', async function(req, res) {

});

// http://localhost:3000/api/customers/1/auction-bids [GET]
app.get('/api/customers/:id/auction-bids', async function(req, res) {

});

// http://localhost:3000/api/auctions [GET]
app.get('/api/auctions', async function(req, res) {

});

// http://localhost:3000/api/auctions/1 [GET]
app.get('/api/auctions/:id', async function(req, res) {

});

// http://localhost:3000/api/auctions/1/winner [GET]
app.get('/api/auctions/:id/winner', async function(req, res) {

});

// http://localhost:3000/api/auctions [POST]
app.post('/api/auctions', async function(req, res) {

});

// http://localhost:3000/api/auctions/1/bids [GET]
app.get('/api/auctions/:id/bids', async function(req, res) {

});

// http://localhost:3000/api/auctions/1/bids [POST]
app.post('/api/auctions/:id/bids', async function(req, res) {

});



// http://localhost:3000
app.listen(port, function() {
    console.log(`Server is listening on port ${port}`);
  });