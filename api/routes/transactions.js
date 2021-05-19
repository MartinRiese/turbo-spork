const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const bodyParser = require('body-parser');
const Papa = require('papaparse');
const fs = require("fs");

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions)
    } catch (err) {
        res.status(500).send(err);
    }

});

router.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let csv = req.files.csv;
            csv.mv('./uploads/' + csv.name);

            const data  = fs.readFileSync('./uploads/' + csv.name, 'utf8');
            
                Papa.parse(data, {
                    header: true,
                    step: function(row) {
                        console.log("Row:", row.data);
                        const transaction = new Transaction({
                            description: row.data.Memo,
                            from: 'altra',
                            to: null,
                            date: row.data.Date,
                            amount: row.data.Amount,
                        })
                        transaction.save().catch(err => console.log(err))
                    },
                    complete: function() {
                        console.log("All done!");
                    }
                });

            res.send({
                status: true,
                message: 'File is uploaded',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({message: err});
    }

});

module.exports = router;