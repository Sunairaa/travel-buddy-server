const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
    name: {type: String, required: true},
    imageUrl: {type: String},
    date: {type: Date, required: true},
    time: {type: Number, required: true}, 
    location: {type: String, required: true},
    description: {type: String, required: true},
    itinerary: { type: Schema.Types.ObjectId, ref: 'Itinerary' }, 
    user: { type: Schema.Types.ObjectId, ref: "User" }
    // map
})

const Activity = model("Activity", activitySchema);

module.exports = Activity;