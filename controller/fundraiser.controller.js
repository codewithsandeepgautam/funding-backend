const express = require('express');
const router = express.Router();
const FundsService = require('../services/fundraiser.service');

router.post('/funds',(req, res)=>{
    const {name, email,phoneNumber,fundsUsed,hospitalStatus} = req.body;
    FundsService.createFundraiser(name, email,phoneNumber,fundsUsed,hospitalStatus)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            console.error("Error creating funds:", error);
            res.status(400).send("Error creating funds");
        });
})

router.get('/', (req, res) => {
    FundsService.getFundsraiser()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            console.error("Error getting newsletters", err);
            res.status(500).send("Error getting newsletters");
        });
});


module.exports = router;