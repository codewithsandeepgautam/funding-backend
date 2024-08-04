const express = require('express');
const router = express.Router();
const ContactService = require('../services/contact.service');

router.post('/con', (req, res) => {
    const { name, email,subject,message} = req.body;
    ContactService.createContact( name, email,subject,message)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            console.error("Error creating contacts:", error);
            res.status(400).send("Error creating contacts");
        });
});

router.get('/',(req, res) =>{
   ContactService.getContacts()
   .then(response =>{
    res.status(200).send(response);
   })
   .catch(err =>{
    console.error("Error getting contacts", err);
    throw new Error("Error getting contacts", err);
   })
})


module.exports = router;