const express = require('express');
const app = express();
const userRoutes = express.Router();

// Require User model in our routes module
let User = require('../models/User');

// Defined store route
userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(game => {
    res.status(200).json({'user': 'Registration is done successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

userRoutes.route('/draw').get(function (req, res) {
  User.count({draw: null}).exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count);

    console.log("random = " + random + ", count=" + count);
  
    // Again query all users but only fetch one offset by our random #
    User.findOne({draw: null}).skip(random).exec(
      function (err, user) {

        console.log("user : " + user);

        if(err){
          console.log(err);
          res.json(err);
        }
        else if (!user) {

          console.log("Null user : " + user);

          res.json(user);
        } 
        else {
          user.draw = true;

          console.log("user before update draw : " + user);

          user.save()
            .then(user => {res.json(user); console.log("user update draw successfully "); })
            .catch(err => {res.json("unable to save to database"); console.log("user update draw fail: " + err); });

        }
      })
  })
});

// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

// Defined edit route
userRoutes.route('/reset/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      res.json(user);
  });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
        user.unit_name = req.body.unit_name;
        user.unit_price = req.body.unit_price;

        user.save().then(adUnit => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userRoutes;