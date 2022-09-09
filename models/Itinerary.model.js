const { Schema, model } = require("mongoose");

const itinerarySchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String },
  countries: { type: [String] },
  cities: { type: [String] },
  flightDetails: { type: [Object] },
  hotelDetails: { type: [Object] },
  activities: { type: [Object] },
  notes: { type: [String] },
  isPublic: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User" }
})

const Itinerary = model("Itinerary", itinerarySchema);

module.exports = Itinerary;