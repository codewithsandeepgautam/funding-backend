const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    category :{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Category',
            required : true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    leftDays:{
        type: Number,
        required : true
    },
    supporters:{
        type: Number,
        required : true
    },
    location:{
        type: String,
        required: true,
    },
    totalMoney:{
        type: Number,
        required : true
    },
    leftMoney: {
        type: Number,
        required : true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [
       {
        type : String
       }
    ],
    likedBy : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    dislikedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    commentBy : [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
    ]

},{timestamps:true});

const Blog = mongoose.model('Blog', blogsSchema);
module.exports = Blog;