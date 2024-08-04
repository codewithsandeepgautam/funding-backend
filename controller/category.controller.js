const express = require('express');
const router = express.Router();
const CategoryService = require('../services/category.service');

router.post('/cat',(req, res)=>{
    const {categoryTitle} = req.body;
    CategoryService.createCategory(categoryTitle)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            console.error("Error creating categories:", error);
            res.status(400).send("Error creating categories");
        });
})

router.get('/', (req, res) => {
    CategoryService.getCategory()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            console.error("Error getting categories", err);
            res.status(500).send("Error getting categories");
        });
});




module.exports = router;