const Funds = require('../schemas/fundraiser.schema');

let service = {};

service.createFundraiser = createFundraiser;
service.getFundsraiser = getFundsraiser;
async function createFundraiser(name, email,phoneNumber,fundsUsed,hospitalStatus){
    try{
        const fundraiser = await Funds.create({name, email,phoneNumber,fundsUsed,hospitalStatus});
        return fundraiser;
    }
    catch(err){
        console.log("Error creating fundraiser", err);
        throw new Error(err.message);
    }
}

async function getFundsraiser() {
    try {
        const fundraiser = await Funds.find();
        return fundraiser;
    } catch (err) {
        console.error("Error getting newsletters", err);
        throw new Error("Error getting newsletters");
    }
}
module.exports = service;