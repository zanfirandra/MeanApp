/*
----Notes----
Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
origin = Two pages have the same origin if the protocol, port (if one is specified), and host are the same for both pages;  https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
express.static built-in middleware function in Express and this in your .html file: <link rel="stylesheet" href="style.css">

*/

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(express.static("."));

app.use(cors());

//app.get('/', (req, res) => res.send('hello world'));

/*app.get('/', function (req,res) {
	res.send("hello world");
}); */

app.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});

app.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+'/register.html'));
});


app.get('/user', function (req,res) {
	var user = [{"userName": "andra",
				 "id": 1},
				 {"userName": "ioana",
				 "id": 2}]
	res.send(user);
});

app.listen(3000, function() { // port 3000. localhost:3000
	console.log('Server starting...');
})