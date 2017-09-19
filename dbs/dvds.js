var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dvds');

// setup dvd Schema

var dvdSchema = new mongoose.Schema({
  
  name: String,
  imageUrl: String
  
});

// setup dvd model

var Dvd = mongoose.model('Dvd', dvdSchema);


// add a new dvd to db

var newDvd = new Dvd({
  name: "Title Here",
  imageUrl: "http://imdb.com/link"
});


// save it to the db

newDvd.save(function(err, dvd){
  if (err){
    console.log('Something went wrong!');
  }
  console.log('DVD saved');
  console.log(dvd);
});


// create() - creates and saves
// Dvd.create({
//   name: "Title Here",
//   imageUrl: "http://imdb.com/link"
// }, function(err, dvd){
//   if (err){
//     console.log('Something went wrong!');
//     console.log(err);
//   } else {
//     console.log(dvd);
//   }
// });


// retrieve all dvds from db

Dvd.find({}, function(err, dvds){
  if (err){
    console.log('Something went wrong!');
    console.log(err);
  } else {
    console.log('All the dvds:');
    console.log(dvds);
  }
})