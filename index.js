const express = require ("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const passport = require("passport");


const authRouter = require("./routes/auth")
const blogRouter = require("./routes/blogs")


require("dotenv").config()

const app = express();

app.use(passport.initialize());
require("../blog_api/authentication/passport")



require("../blog_api/db").connectToMongoDB()



app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

const PORT = process.env.PORT

app.get("/", (req,res)=>{
    console.log("Hello server")
    res.send("Welcome Server")
})


app.use("/", authRouter);
app.use("/blogs", blogRouter);


app.listen( PORT, () => {
    console.log(`Welcome to http//:localhost:${PORT}`)
});


