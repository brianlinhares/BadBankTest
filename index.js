var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
const e = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

//=================================================Create Account=================================================
app.get('/account/create/:name/:email/:password/:role', function (req, res) {

  // check if account exists
  dal.find(req.params.email).
      then((users) => {

          // if user exists, return error message
          if(users.length > 0){
              console.log('User already in exists');
              res.send('User already in exists');    
          }
          else{
              // else create user
              //decode password from url
              const decodePassword = decodeURIComponent(req.params.password);
              //use decoded password and create a hash
              bcrypt.hash(decodePassword, saltRounds).then(function(hash) {
                  dal.create(req.params.name,req.params.email,hash,req.params.role).//added role to database
                  then((user) => {
                      console.log(user);
                      res.send(user);            
                  }); 
              });
          }

      });
});
//=================================================Login=================================================
app.get('/account/login/:email/:password', function (req, res) {

  dal.find(req.params.email).
      then((user) => {
          
          // if user exists, check password
          if(user.length > 0){
              //decodes password from url
              const decodePassword = decodeURIComponent(req.params.password);
              //uses decoded password and creates a hash
              bcrypt.compare(decodePassword, user[0].password).then(function(result) {
                  if (result){
                      res.send(user[0]);
                  }
                  else{
                      res.send('Login failed: wrong password');
                  }
              });
              
          }
          else{
              res.send('Login failed: user not found');
          }
  });
  
});
//=================================================Locate Account=================================================
app.get('/account/find/:email', function (req, res) {

  dal.find(req.params.email).
      then((user) => {
          console.log(user);
          res.send(user);
  });
});
//=================================================Alt Locate Account=================================================
app.get('/account/findOne/:email', function (req, res) {

  dal.findOne(req.params.email).
      then((user) => {
          console.log(user);
          res.send(user);
  });
});
//=================================================Withdraw/Deposit=================================================
app.get('/account/update/:email/:amount', function (req, res) {

  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).
      then((response) => {
          console.log(response);
          res.send(response);
  });    
});
//=================================================All accounts=================================================
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});
//=================================================LISTEN & PORT=================================================
var port = 3000;
app.listen(port);
console.log('Running on port: '+port);