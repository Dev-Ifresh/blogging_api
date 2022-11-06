const mongoose = require("mongoose")
const User = require('../model/user')

const ObjectId = mongoose.Schema.ObjectId;

const BlogSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    desc:{
        type:String,
        required: false
    },
    author:{
        type: String,
        required: true,
    },
    author_id:{
        type: ObjectId,
        required: true,
    },
    tags:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    
    },
    state: {
        type: String,
        required: true,
        enum: [ 'draft', 'published' ],
        default: "draft",
    },
    read_count: {
        type: Number,
        default: 0
        },

    read_time:{
            type: Number,
  
        } 
},
{ timestamps: true }
);

const BlogModel = mongoose.model('blogs', BlogSchema);

module.exports = BlogModel;