var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/trip_plan');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var placeSchema= new mongoose.Schema({
	address:	String,
	city:		String,
	state:		String,
	phone:		String,
	location:	[Number]
});

var hotelSchema=  new mongoose.Schema({
	name:		String,
	place:		[placeSchema],
	num_stars:  Number,
	amenities:	String
});

var thingToDoSchema= new mongoose.Schema({
	name:		String,
	place:		[placeSchema],
	age_range:	String
});

var restaurantSchema= new mongoose.Schema({
	name:		String,
	place:		[placeSchema],
	cuisine:	String,
	price:		Number
});

module.exports.Place = mongoose.model('Place', placeSchema);
module.exports.Hotel = mongoose.model('Hotel', hotelSchema);
module.exports.ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
module.exports.Restaurant = mongoose.model('Restaurant', restaurantSchema);
