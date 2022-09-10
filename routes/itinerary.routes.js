const router = require("express").Router();
const mongoose = require('mongoose');

const Itinerary = require('../models/Itinerary.model');
const Activity = require('../models/Activity.model');

// GET /api/itineraries -  Retrieves all of the itineraries
router.get('/itineraries', (req, res) => {
    Itinerary.find()
      .populate('activities')
      .then(allItneraries => res.json(allItneraries))
      .catch(err => res.json(err));
});

//  POST /api/itineraries -  Creates a new itinerary
router.post('/itineraries', (req, res) => {
  console.log(req.body)
  const { isPublic, title, duration,imageUrl, countries, cities, flightDetails, hotelDetails, activities, notes, user} = req.body;
  
  // flightDetailsObj = JSON.parse(flightDetails)
  // hotelDetailsObj = JSON.parse(hotelDetails)
  // activitiessObj = JSON.parse(activities)

  Itinerary.create({ isPublic, title, duration,imageUrl, countries, cities, flightDetails, hotelDetails, activities, notes, user})
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

//  GET /api/itineraries/:itineraryId -  Retrieves a specific itinerary by id
router.get('/itineraries/:itineraryId', (req, res) => {
    const { itineraryId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each Itinerary document has `activities` array holding `_id`s of Activity documents
    // We use .populate() method to get swap the `_id`s for the actual Activity documents
    Itinerary.findById(itineraryId)
      // .populate('activities')
      .then(itinerary => res.status(200).json(itinerary))
      .catch(error => res.json(error));
});

// PUT  /api/itineraries/:itineraryId  -  Updates a specific itinerary by id
router.put('/itineraries/:itineraryId', (req, res) => {
    const { itineraryId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Itinerary.findByIdAndUpdate(itineraryId, req.body, { new: true })
      .then((updatedItinerary) => res.json(updatedItinerary))
      .catch(error => res.json(error));
});


// DELETE  /api/itineraries/:itineraryId  -  Deletes a specific itinerary by id
router.delete('/itineraries/:itineraryId', (req, res) => {
    const { itineraryId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Itinerary.findByIdAndRemove(itineraryId)
      .then(() => res.json({ message: `Project with ${itineraryId} is removed successfully.` }))
      .catch(error => res.json(error));
});

module.exports = router;
