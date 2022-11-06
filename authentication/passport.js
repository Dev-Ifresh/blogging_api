const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/user')

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


//The job of the passport jwt is to take the users info object and fuse it into a token then send it to the user
//so whenever the user makes a request he makes the request with that token
//Then the server opens the token check if the user object is correct and valid, if so it responds to the request
passport.use(
    'jwt',
    //passport have different authentication strategy, so we are defining that we are using the JWTstrategy
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,//for the fusing process to happen need a key or secret to use
    
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // so after the token has been created, this is telling  passport that whenever the user sends a request,go to the AuthHeader and to see if he sent a token
        },
        async (token, done) => {// if you see a token, Great!!! then authenticate if the user details are valid
            try {
                return done(null, token.user);
            } catch (error) {  //if you don't see a token, send error
                done(error);
            }
        }
    )
);

// // This middleware saves the information provided by the user to the database,
// // and then sends the user information to the next middleware if successful.
// // Otherwise, it reports an error.
// passport.use(
//     'signup',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         async (email, password, done) => {
//             try {
//                 const user = await UserModel.create({ email, password });

//                 return done(null, user);
//             } catch (error) {
//                 done(error);
//             }
//         }
//     )
// );

// // This middleware authenticates the user based on the email and password provided.
// // If the user is found, it sends the user information to the next middleware.
// // Otherwise, it reports an error.
// passport.use(
//     'login',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         async (email, password, done) => {
//             try {
//                 const user = await UserModel.findOne({ email });

//                 if (!user) {
//                     return done(null, false, { message: 'User not found' });
//                 }

//                 const validate = await user.toCheckPassword(password);

//                 if (!validate) {
//                     return done(null, false, { message: 'Wrong Password' });
//                 }

//                 return done(null, user, { message: 'Logged in Successfully' });
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );