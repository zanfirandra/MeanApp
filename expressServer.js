/*
----Notes----
Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
origin = Two pages have the same origin if the protocol, port (if one is specified), and host are the same for both pages;  https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
express.static built-in middleware function in Express and this in your .html file: <link rel="stylesheet" href="style.css">

//
*/

var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');

app.use(express.static("."));
app.use(cors());
app.use(bodyParser.json());

//app.get('/', (req, res) => res.send('hello world'));

/*app.get('/', function (req,res) {
	res.send("hello world");
}); */
mongoose.connect('mongodb://localhost/MeanDB');
//schema definition
var userSchema  = new mongoose.Schema({
    username: String,
    password: String
})

//convert userSchema into a model so we can work with it
var userModel = mongoose.model('User', userSchema); // instances of Models are documents.


app.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/register', function(req,res){
    //userModel.create({username: })
    //console.log(req.body);
    //res.send(req.body);
    
    userModel.find({"username": req.body.username}, function(err, usernames){
        console.log(usernames);
        if (usernames.length>= 1) {
           res.send("errorCreateUser: User already created! Please try again using another username.");//return res.status(500).send(err);
            //console.log(usernames);
            console.log(req.body.username);
        } else {
            userModel.create({username: req.body.username,password: req.body.password}, function(err){
                res.send("successCreateUser: Congrats! You have successfully registered! ")
            })
        }
    })
    
});

app.listen(3000, function() { // port 3000. localhost:3000
	console.log('Server starting...');
})