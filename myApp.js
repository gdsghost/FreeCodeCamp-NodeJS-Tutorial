require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("databse connected");
});

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number
  },
  favoriteFoods: [{
    type: String
  }]
});

const Person = mongoose.model('Person', PersonSchema);


const createAndSavePerson = (done) => {
  const person = new Person({ name: "Sudam Yasodya", age: 23, favoriteFoods: ["Pizza", "Cake", "Burgers"] });
  person.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, data) {
    if (err) {
      return done(err);
    }
    else {
      data.favoriteFoods.push(foodToAdd);
      data.save(function(err, data) {
        if (err) return done(err);
        done(null, data);
      });
    }
  });
};

const findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate(
    { "name": personName },
    { $set: { "age": ageToSet } }, 
    { returnNewDocument: true },
    function(err, doc) {
      if (err) {
        return done(err);
      }
      done(null, doc);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err, data) {
        if (err) return done(err);
        done(null, data);
      });
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({name:"asc"}).limit(2).select("-age").exec(function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
