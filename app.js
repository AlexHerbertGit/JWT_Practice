// Load the dependencies
const express = require('express');
const bodyParser = require('bosy-parser');
const mongoose = require('mongoose');

//Load config
const config
const port = process.env.PORT || 3000;

//Express configuration
const app = express();

//Parse JSON and URL encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set the secret key var for JWT
app.set('jwt-secret', config.secret);

//Index page for testing
app.get('/', (req, res) => {
    res.send('Testing JWT')
});

//Configure API router
app.use('/api', require('./routes/api'));

//Open the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});

//Connect to MongoDB server
mongoose.connect(config.mongoDbUri)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('connected to mongodb server')
});