var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  $ = require('jquery');


mongoose.connect('mongodb://localhost/dvds');

// setup body parser
// app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({
  extended: true
}));


// set directory
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/js'));

// set the view engine
app.set('view engine', 'ejs');



// set routes 
app.get('/', function(req, res) {
  // res.send('landing page here');
  res.redirect('dvds');
});

// setup Schema
var dvdSchema = new mongoose.Schema({

  name: String,
  image: String,
  imdbLink: String,
  description: String

});

// setup dvd model
var Dvd = mongoose.model('Dvd', dvdSchema);


// retrieve all dvds from db

Dvd.find({}, function(err, dvds) {
  if (err) {
    console.log('Something went wrong!');
    console.log(err);
  } else {
    console.log('All the dvds:');
    console.log(dvds);
  }
})


// dummy data
// var dvds = [
//       { name: "Back to the Future", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,643,1000_AL_.jpg"},
//       { name: "Back to the Future Part 2", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BZTMxMGM5MjItNDJhNy00MWI2LWJlZWMtOWFhMjI5ZTQwMWM3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg" },
//       { name: "Back to the Future Part 3", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BYjhlMGYxNmMtOWFmMi00Y2M2LWE5NWYtZTdlMDRlMGEzMDA3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,676,1000_AL_.jpg"}
//     ];



// INDEX route
app.get('/dvds', function(req, res) {
  // get all dvds from db
  Dvd.find({}, function(err, dvds) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        dvds: dvds
      });
    }
  });

});


// same as .get route
// CREATE - post dvd to db
app.post('/dvds', function(req, res) {
  // res.send('BAM!');

  // get data from form
  var name = req.body.name;
  var image = req.body.image;
  var imdbLink = req.body.imdbLink;
  var description = req.body.description;
  var newDvd = {
    name: name,
    image: image,
    imdbLink: imdbLink,
    description: description
  };

  // create new dvd and save to db
  Dvd.create(newDvd, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to dvds page
      res.redirect('/dvds');

    }
  });

  // add data to collection array
  // dvds.push(newDvd);

});


// render post form
// NEW - show form to create new dvd 
app.get('/dvds/new', function(req, res) {
  res.render("new");
});

//SHOW more info about a dvd
app.get('/dvds/:id', function(req, res) {
  // find the dvd with the provided ID
  Dvd.findById(req.params.id, function(err, foundDvd) {
    if (err) {
      console.log(err);
    } else {

      // render the template with the id
      res.render('details', {
        dvd: foundDvd
      });
    }
  });

});

var port = process.env.port || 3000;

// server
app.listen(port, process.env.IP, function() {
  console.log('CollectionDB Server Started');
});