/*
----Notes----
Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
origin = Two pages have the same origin if the protocol, port (if one is specified), and host are the same for both pages;  https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
express.static built-in middleware function in Express and this in your .html file: <link rel="stylesheet" href="style.css">
app.use - will run as middleware on all request

**Authorization (in header)- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization  Authorization: <type> <credentials>
Bearer type - Bearer authentication (also called token authentication) https://swagger.io/docs/specification/authentication/bearer-authentication/
Base64 encoding does not mean encryption or hashing! This method is equally secure as sending the credentials in clear text (base64 is a reversible encoding). Prefer to use HTTPS in conjunction with Basic Authentication.

401 “Unauthorized” response returned for requests that do not contain a proper bearer token. 
The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources
the token is exposed to users or other parties, even though they are unable to change it. This means you should not put secret information within the token.


*/

var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var http = require('http');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var bcrypt = require('bcryptjs');

var router = express.Router();

app.use(express.static(__dirname)); //to serve static files (htmls); build-in middleware
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // middleware to give Express the ability to read JSON payloads from http request body


//make some paths unprotected as follows:
var jwtSecret = 'secret_key';


mongoose.connect('mongodb://localhost/MeanDB');

//schema definition
var userSchema  = new mongoose.Schema({
    username: String,
    password: String
})
//custom
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password/* hash password */)
}

//convert userSchema into a model so we can work with it
var userModel = mongoose.model('User', userSchema); // instances of Models are documents.


/*app.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
    console.log("index get");
});

app.get('/login',function(req,res,next){
  res.sendFile(path.join(__dirname+'/index.html'));
    console.log("login get");
});

app.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
    console.log("register get");
});*/


/*app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, '/index.html')); 
});*/

app.post('/register', function(req,res){

    userModel.find({"username": req.body.username}, function(err, user){
        if (user.length>= 1) {
           res.send("errorCreateUser: User already created! Please try again using another username.");//return res.status(500).send(err);
        } else {
            bcrypt.hash(req.body.password, 5, function(err,hash){
                userModel.create({username: req.body.username,password: hash}, function(err, user){
                    res.send("successCreateUser: Congrats! You have successfully registered! ")
                })
            })
            
        }
    })

});

app.post(['/login','/index'], function(req,res){

    userModel.findOne({"username": req.body.username}, function(err, user){
        if(user === null){
            res.send("errorLoginUser: Wrong username or password! Please try again!");
        } else {
            if(user.comparePassword(req.body.password)){
                var token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { //paylod, key
                  expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    token: token
                });
            }
                else
                    res.send("errorLoginUser: Wrong username or password! Please try again!");
            }
        });
    
});


//middleware function to verify whether or not token exits
// don't want to protect /login or /register => beneath that routes
function ensureToken(req, res, next){
    //console.log('ensure Token');
   // console.log(req.headers);
    var authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (typeof authHeader !== 'undefined'){
        var bearer = authHeader.split(" ");
        var bearerToken = bearer[1]; // ** Notes
        req.token = bearerToken;
        
      
        jwt.verify(req.token, jwtSecret, function(err,data){ //data: decoded payload
        if(err){
             res.json({ 
                 success: false,
                 message: 'Unable to authenticate. Please try again.' });  
        } else {
            //if everything is ok
            res.json({
                success: true,
                message: 'Welcome to your page!',
                username: data.username
            });
            next();
          }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided. Please try again.' 
            });
        }
};

app.post('/upload', ensureToken, function(req,res,next){
   // console.log('HEADERS');
   // console.log(req.headers);
    var token = req.headers['authorization'];
    // console.log(token);
   

});

//app.use('/upload', ensureToken); //apply the routes to application with the prefix '/'

app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, '/index.html')); 
});

    
app.listen(3000, function() { // port 3000. localhost:3000
	console.log('Server starting...');
})
