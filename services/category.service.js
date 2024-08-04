const CategorySchema = require('../schemas/category.schema');

let service = {};
service.createCategory = createCategory;
service.getCategory = getCategory;

async function createCategory(categoryTitle){
    try{
        const categories = await CategorySchema.create({categoryTitle});
        console.log(categories);
        return categories;
    }
    catch(err){
        console.log("Error creating category", err);
        throw new Error(err.message);
    }
}

async function getCategory() {
    try {
        const categories = await CategorySchema.find().populate("categoryTitle");
        return categories;
    } catch (err) {
        console.error("Error getting categories", err);
        throw new Error("Error getting categories");
    }
}

module.exports = service;
