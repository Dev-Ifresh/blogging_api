const mongoose = require("mongoose");

require ("dotenv").config();

// MONGODB_URL = process.env.MONGODB_URL

function connectToMongoDB() {
    
mongoose.connect("mongodb+srv://Isaacadun:Isaakadun@cluster0.ki7ilh4.mongodb.net/blog_api?retryWrites=true&w=majority")

 .then (console.log("MongoDB Connected"))
.catch((err) => console.log(err));
}

module.exports = { connectToMongoDB }
