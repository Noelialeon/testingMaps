var express = require('express');
var router = express.Router();
var Restaurant = require('../../models/restaurant');

// Listar restaurantes
router.get('/', (req, res) => {
	Restaurant.find((error, restaurants) => {
		if (error) {
			res.status(500)
			res.json({ message: error });
		} else {
			res.status(200)
			res.json(restaurants);
		}
	})
});

// Crear restaurantes
router.post('/', (req, res, next) => {
	
	const restaurant = req.body;
	
	Restaurant.create( restaurant )
		.then((value) => {
			res.status(200)
			res.json(value);
		})
		.catch((err) => {
			res.status(500);
			res.json(err);
		})
});


router.get('/search', (req, res) => {
	var latitude = req.query.lat;
	var longitude = req.query.lng;
	var maxDistance = req.query.dis;
	Restaurant.where('location')
		.near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance })
		.find((error, restaurants) => {
			if (error) {
				res.status(500).json({ message: error });
			} else {
				res.status(200).json(restaurants);
			}
		});
})

router.get('/:restaurant_id', (req, res) => {
	Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
		if (error) {
			res.status(500).json({ message: error });
		} else {
			res.status(200).json(restaurant);
		}
	})
});



module.exports = router;