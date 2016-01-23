'use strict';

var port = process.env.PORT || 8080

var http = require('http')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')


/* Database - Models */

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/el-contactor');

var Contact = mongoose.model('Contact', {
  number: { type: String, maxlength: 5 },
  street: { type: String, maxlength: 150 },
  city: { type: String, maxlength: 100 },
  postcode: { type: String, maxlength: 8 },
  firstname: { type: String, maxlength: 100 },
  lastname: { type: String, maxlength: 100, required: true }
})

schema.pre('save', function(next) {
  // this.foo = 'bar';
  // TODO: Geocode !

  next();
})


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
