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

//=================================================Withdraw=================================================
app.get('/account/withdraw/:email/:amount', function (req, res) {
  dal.updateNegative(req.params.email, req.params.amount).
  then((user) => {
      console.log(user);
  });  
  res.send({
        name:       req.params.name,  
        email:      req.params.email,
        password:   req.params.password,
        balance:    req.params.balance,
        amount:     req.params.amount
    });
});
//=================================================Deposit=================================================
app.get('/account/deposit/:email/:amount', function (req, res) {
  dal.update(req.params.email, req.params.amount).
  then((user) => {
      console.log(user);
  });  
  res.send({
        name:       req.params.name,  
        email:      req.params.email,
        password:   req.params.password,
        balance:    req.params.balance,
        amount:     req.params.amount
    });
});
//=================================================Login=================================================
app.get('/account/login/:email/:password', function (req, res) {
  dal.find(req.params.email).
      then((user) => {
          if(user.length > 0){
              const decodePassword = decodeURIComponent(req.params.password);
              bcrypt.compare(decodePassword, user[0].password).then(function(result) {
                  if (result){
                      res.send(user[0]);
                  }
                  else{
                      res.send('Incorrect Password');
                  }
              });
          }
          else{
              res.send('Incorrect Account Email');
          }
  });
});
//=================================================Same as starter=================================================
  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  });
//=================================================Same as starter=================================================
  app.get('/protected', (req, res) => {
    if (req.session.products) {
      res.render('protected', { products: req.session.products });
    } else {
      res.redirect('/login');
    }
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
//=================================================Create Account=================================================
app.get('/account/create/:name/:email/:password/:role', function (req, res) {
  dal.find(req.params.email).
      then((users) => {
          if(users.length > 0){
              console.log('This username is taken, please select another.');
              res.send('This username is taken, please select another.');    
            }
          else{
              const decodePassword = decodeURIComponent(req.params.password);
              bcrypt.hash(decodePassword, saltRounds).then(function(hash) {
                  dal.create(req.params.name,req.params.email,hash,req.params.role).
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
          if(user.length > 0){
              const decodePassword = decodeURIComponent(req.params.password);
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