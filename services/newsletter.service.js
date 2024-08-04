const News = require('../schemas/newsletter.schema');

let service = {};
service.createNewsLetter = createNewsLetter;
service.getNewsLetter = getNewsLetter;

async function createNewsLetter(email){
    try{
        const newsletter = await News.create({email});
        return newsletter;
    }
    catch(err){
        console.log("Error creating newsLetter",err);
        throw new Error(err.message);
    }
}

async function getNewsLetter(){
    try{
        const newsLetter = await News.find();
        return newsLetter;
    }
    catch(err){
        console.log("Error getting newsLetter",err);
        throw new Error(error.message);
    }
}
module.exports = service;