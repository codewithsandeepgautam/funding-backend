const newsService = require('../services/newsletter.service');
const express = require('express');
const router = express.Router();

router.post('/newsl',(req, res)=>{
    const {email} = req.body;
    newsService.createNewsLetter(email)
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        console.log("Error creating newsLetter", err);
    })
})

router.get('/',(req, res) =>{
    newsService.getNewsLetter()
    .then(response =>{
     res.status(200).send(response);
    })
    .catch(err =>{
     console.error("Error getting newsLetters", err);
     throw new Error("Error getting newsLetters", err);
    })
 })
module.exports = router;