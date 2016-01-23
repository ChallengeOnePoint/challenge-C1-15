'use strict';

var port = process.env.PORT || 8080

var http = require('http')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var geocode = require('./node_modules/google-geocoding')


/* Database - Models */

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/el-contactor');

var ContactSchema = new mongoose.Schema({
  number: { type: String, maxlength: 5 },
  street: { type: String, maxlength: 150 },
  city: { type: String, maxlength: 100 },
  postcode: { type: String, maxlength: 8 },
  firstname: { type: String, maxlength: 100 },
  lastname: { type: String, maxlength: 100, required: true }
})

ContactSchema.methods = {
  geocode: function() {
    var query = this.street + ', ' + this.postcode + ' ' + this.city;
    return geocode.geocode(query, function(err, location) {
      if (err) {
        console.log('Error:' + err);
      }
      else if (!location) {
        console.log('No result.');
      }
      else {
        return location;
      }

      return null;
    });
  }
}

ContactSchema.pre('save', function(next) {
  this.geocode();
  next();
})

var Contact = mongoose.model('Contact', ContactSchema);


/* Controllers */

var router = express.Router();

router.route('/api/contacts')
  .get(function(req, res) {
    Contact.find(function(err, contacts) {
      if (err) {
        return res.send(err);
      }

      res.json(contacts);
    });
  })
  .post(function(req, res) {
    var contact = new Contact(req.body);

    contact.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Contact Added' });
    });
  });

router.route('/contacts/:id')
  .get(function(req, res) {
    Contact.findOne({ _id: req.params.id}, function(err, contact) {
      if (err) {
        return res.send(err);
      }

      res.json(contact);
    });
  })
  .put(function(req,res){
    Contact.findOne({ _id: req.params.id }, function(err, contact) {
      if (err) {
        return res.send(err);
      }

      for (prop in req.body) {
        contact[prop] = req.body[prop];
      }

      contact.save(function(err) {
        if (err) {
          return res.send(err);
        }

        res.json({ message: 'Contact updated!' });
      });
    });
  })
  .delete(function(req, res) {
    Contact.remove({
      _id: req.params.id
    }, function(err, contact) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  })


router.get('/', function(req, res){
  res.send('hello world');
});

app.use(router)


/* Funky */

app.get('/', function(req, res){
  res.send('Welcome to El Contactor => Go speak API !');
});



/* Server */

var server = http.createServer(app)
server.listen(port)

console.log('Hello world!')
