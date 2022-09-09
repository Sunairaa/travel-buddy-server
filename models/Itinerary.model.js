const { Schema, model } = require("mongoose");

const itinerarySchema = new Schema({
  title: {type: String, required: true},
  imageUrl: {type: String},
  countries: [String],
  cities: [String],
  flightDetails: [Object],
  hotelDetails: [Object],
  activities: [Object],
  notes: [String],
  isPublic: {type: Boolean, default: false},
  user: { type: Schema.Types.ObjectId, ref: "User" }
})

const Itinerary = model("Itinerary", itinerarySchema);

module.exports = Itinerary;