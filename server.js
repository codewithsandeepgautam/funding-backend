const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config();
const { imageUploadMiddleware } = require('./middleware/multer');
const PORT = 2000;
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(resp => { 
  console.log("Database Connected!")
}).catch(error => console.log("Unable to connect to DB!"));app.get("/", (req, res) => {
    res.send("Working!");
})

app.use('/api/user',require('./controller/user.controller'));
app.use('/userContacts',require('./controller/contact.controller'));
app.use('/api/blogs', imageUploadMiddleware("image",5),require('./controller/blogs.controller'));
app.use('/api/newsletter',require('./controller/newsletter.controller'));
app.use('/api/fundraiser',require('./controller/fundraiser.controller'));
app.use('/api/categories',require('./controller/category.controller'));
app.use('/api/payment',require('./controller/payment.controller'));
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
const server = app.listen(PORT, () => {
    console.log(`Server started at ${PORT}!`);
})

