const router = require("express").Router();

// const mongoose = require('mongoose');

const Itinerary = require('../models/Itinerary.model');
const Activity = require('../models/Activity.model');

//  POST /api/projects  -  Creates a new itinerary
router.post('/itinerary', (req, res) => {
  const { title, location, imageUrl, flightDeparture, flightReturn, airline, hotelCheckin, hotelCheckout, hotelName, isPublic, activities, user } = req.body;

  Itinerary.create({ title, location, imageUrl, flightDeparture, flightReturn, airline, hotelCheckin, hotelCheckout, hotelName, isPublic, activities, user })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

module.exports = router;
