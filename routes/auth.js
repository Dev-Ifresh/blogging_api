const express = require('express');
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const createToken = function(user){
    const payload = { user }

    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY_TIME,
    })
    return token;
}

authRouter.post(
    '/signup',
    async (req,res, next) => {
        try {
        
            const { firstname, lastname, email, password} = req.body;
            const user = await UserModel.create({
                firstname,
                lastname,
                email,
                password
            });
        
            user.password = undefined;
            const token = createToken(user)
            return res.status(201).json({
                staus: "success",
                token,
                data: {
                    user,
                },
            });
            
        } catch (error) {
            return next(error);
            
        }
        });
        

authRouter.post(
    '/login',
    async (req,res, next) => {
        try {
        
            const { email, password} = req.body;
            const user = await UserModel.findOne({ email });
    
                    if (!user) {
                        return next( new Error ('User not found'));
                    }
    
                    const validate = await user.toCheckPassword(password);
    
                    if (!validate) {
                        return next ( new Error ('Wrong Password'));
                    }
    
                    // return next('Logged in Successfully');
        
            user.password = undefined;
            const token = createToken(user)
            return res.status(201).json({
                staus: "success",
                token,
                data: {
                    user,
                },
            });
            
        } catch (error) {
            return next(error);
            
        }
        });
    
    

module.exports = authRouter;