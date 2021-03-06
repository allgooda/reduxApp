var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '))
//SET UP SESSIONS
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie:{maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days 24 hours 60 minutes 60 seconds
}))
//SAVE TO SESSION CART API
app.post('/cart', function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if(err) {
      throw err;
    }
    res.json(req.session.cart)
  })
});
//GET SESSION CART API
app.get('/cart', function(req, res) {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});
//END SET UP SESSIONS

var Books = require('./models/books.js');

//POST BOOKS
app.post('/books', function(req,res) {
  var book = req.body;

  Books.create(book, function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  })
});

//GET ALL BOOKS
app.get('/books', function(req, res) {
  Books.find(function(err, books) {
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

//UPDATE BOOK
app.put('/books/:_id', function(req, res) {
  var book = req.body;
  var query = {_id: req.params._id};
  //if the field doesnt exist $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price,
    }
  };

  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books) {
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

//DELETE BOOK
app.delete('/books/:_id', function(req, res) {
  var query = {_id: req.params._id };
  Books.remove(query, function(err, books) {
    if(err) {
      console.log("API Delete Books:", err);
    }
    res.json(books)
  })
});

//GET BOOK IMAGES
app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images/';
  //req file system
  const fs = require('fs');
  //read files in dir
  fs.readdir(imgFolder, function(err, files) {
    if(err) {
      return console.error(err);
    }
    //create an empty array
    const filesArr = [];
    //iterate all files in dir and add to the array
    files.forEach(function(file) {
      filesArr.push({name: file});
    });
    res.json(filesArr);
  })
})

//END APIs
app.listen(3001, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
