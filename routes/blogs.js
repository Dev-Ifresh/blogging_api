const express = require("express");
const User = require("../model/user");
const Blogs = require("../model/blog");
const passport = require("passport")
const jwt = require("jsonwebtoken")
const blogRouter = express.Router();
//TO GET ALL BLOG

blogRouter.get("/",async (req,res)=> {

    const author = req.query.author; // trying to sort the get all post by authorname
    const tags = req.query.tags; //trying to sort the get all post by tags
    const title = req.query.title //trying to sort the get all post by title

    try {
        let blog;
        if(author){// I am throwing a condition that if the request has a query of author in it
            blog = await Blogs.find({author:author, state:"published"})// every request has a value(like this /?author:john) which we will have to find the post made by the author: john
        }
        else if(tags){// same here, throwing a condition if the request carries a query of cat(short for category) 
             blog = await Blogs.find({tags:tags, state:"published"}) //same thing happening here also note that you can paste the request query inside the conditions without creating a const
        }
        else if(title){
            blog = await Blogs.find({title:title, state:"published"}) // the curly braces in the bracket indicates that it's an object
        }
       else{ 
         blog = await Blogs.find({state:"published"});
        }
        res.status(200).json(blog);
    }
    catch(err){
        res.status(500).json(err)
    }
});

//GET BLOG
blogRouter.get("/:id",async (req,res)=> {
     
    try {
        const { id }  = req.params
     const blog = await Blogs.findById({_id:id, state:"published" })

       blog.read_count += 1
       await blog.save()

        res.status(200).json(blog)
    }
    catch(err){
        res.status(500).json(err)
    }
})
;


//CREATE BlOG
blogRouter.post("/",passport.authenticate("jwt", { session: false }), async (req , res) =>{
    const newBlog = new Blogs({ ...req.body, author_id: req.user._id });
    try {
       const savedBlog  = await newBlog.save();
        res.status(200).json(savedBlog);
        
    } catch (err) {
        res.status(500).json(err)
    }
})


//UPDATE BLOG
blogRouter.put("/:id", passport.authenticate("jwt", { session: false }),  async (req,res) =>{

    try {
        const updateBlog = await Blogs.findByIdAndUpdate(req.params.id,{//here i used the Post model method to find the post and update it
            $set:req.body,// this is to set whatever is in the req.body as the updated post
        },
        { new: true } // this is for us to see our updated post
        );
        res.status(200).json(updateBlog);
} catch (err) {
    
    res.status(500).json(err)
}
 }
);

//DELETE BLOG
blogRouter.delete("/:id", passport.authenticate("jwt", { session: false }), async (req,res) =>{

     try {
         await Blogs.findByIdAndDelete(req.params.id)
         res.status(200).json("Post has been deleted!!");
 } catch (err) {
     
     res.status(500).json(err)
 }
 
});

module.exports = blogRouter