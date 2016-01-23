'use strict';

var port = process.env.PORT || 8080

var http = require('http')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var geocode = require('google-geocoding')

var dataService = require('./dataService')
var jsonParser = require('json-parse')

/* Database - Models */

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/el-contactor');

var ContactSchema = new mongoose.Schema({
  number: { type: String, maxlength: 5 },
  street: { type: String, maxlength: 150 },
  city: { type: String, maxlength: 100 },
  postcode: { type: String, maxlength: 8 },
  firstname: { type: String, maxlength: 100 },
  lastname: { type: String, maxlength: 100, required: true },
  location: { type: Object }
})

ContactSchema.methods = {
  getGeocode: function(next) {
    var query = this.street + ', ' + this.postcode + ' ' + this.city;
    return geocode.geocode(query, function(err, location) {
      if (err) {
        console.log('Error:' + err)
      }
      else if (!location) {
        console.log('No result')
      }
      else {
        console.log('location ', location)
        return next(location)
      }

      return next(null);
    });
  }
}

ContactSchema.pre('save', function(next) {
  var model = this;
  model.getGeocode(function(location) {
    if (location != null) {
      model.location = location
    }

    next()
  })
})

var Contact = mongoose.model('Contact', ContactSchema);


/* Controllers */

app.use(bodyParser({
    limit: '2mb'
}));

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Server */

function importContacts(next) {
  dataService.getContacts(function(jsonContacts) {
    jsonParser([])(jsonContacts); // Holly library

    var jsonContactsPromises = []
    for (var i=0; i < jsonContacts.length; i++) {
      var contact = new Contact(jsonContacts[i]);
      jsonContactsPromises.push(contact.save());
    }

    return Promise.all(jsonContactsPromises)
    .then(function() {
      var server = http.createServer(app)
      server.listen(port)

      console.log('Hello world!')
    })

  })
}

importContacts()
