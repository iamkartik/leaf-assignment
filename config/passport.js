const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const uuid = require('uuidv4');


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/auth/google/callback'
},function(accessToken,refreshToken,profile,callback){
    
    User.find({ gid: profile.id }, function (err, user) {
        if(err){
            return callback(err,null);
        }
        // user data found return it 
        if(user.length>0){
            return callback(null,user[0]);
        }else{
            // create a new user in the db
            const user = new User ({
                gid:profile.id,
                accessToken,
                refreshToken,
                name:profile.displayName,
                picture:profile._json.picture,
                apiKey:uuid()
            });

            user.save(function(err,user){
                return callback(err,user);
            });
        }

    });
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        return res.redirect('/login');
    }
}

exports.isAuthorized = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        // verify it's the correct token
        User.find({apiKey:token},(err,data)=>{
            if(err){
                return res.status(500).send({err:'Looks like an error happened.Please try again.'});
            }
            if(data.length===0){
                return res.status(401).send({err:'Invalid apiKey.Please login in the app to generate a new apiKey.'});
            }else{
                if(data[0].apiKey!==token){
                    return res.status(401).send({err:'Invalid apiKey.Please login in the app to generate a new apiKey.'});
                }else{
                    next();
                }
            }

        })
    }else{
        return res.status(401).send({err:'Please login in the app to get a valid apiKey and send it in the request headers.'})
    }

}