const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config');

app.use(bodyParser.json())
app.use(fileUpload({
  createParentPath: true
}));


const transactionsRoute = require('./routes/transactions');
app.use('/transactions', transactionsRoute)

app.get('/', (req, res) => {
    res.send('We are on home');
});

mongoose.connect(
    process.env.DB_CONNECTION ,
    { useUnifiedTopology: true, useNewUrlParser: true  },
    () => console.log('db ok'));
    
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.listen(3000);
