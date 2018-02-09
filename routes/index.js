var express = require('express');
var router = express.Router();

const Restaurant = require('../models/restaurant');
const allRestaurants = [];

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/', (req, res, next) => {

	let restaurant = new Restaurant();
	
	restaurant.name = req.body.name;
	restaurant.description = req.body.description;
	restaurant.location.type = 'Point';
	restaurant.location.coordinates = [req.body.longitude, req.body.latitude];
	allRestaurants.push(restaurant);
	restaurant.save((error) => {
		if (error) {
			next(error);
		} else {
			res.redirect('/');
		}
	})
});

module.exports = router;
