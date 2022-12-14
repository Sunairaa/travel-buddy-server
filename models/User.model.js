const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true},
  imageUrl: { type: String },
  itineraries: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }], 
})

const User = model("User", userSchema);

module.exports = User;
