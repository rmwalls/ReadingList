// Require mongoose
const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

const GoogleBooksSchema = new Schema({
  number_id: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  // `link` must be of type String - look for regex
  link: String,
// `image` must be of type String - look for regex
  image: String,
  // `array` must be an Array
  authors: Array,
  // `date` must be of type Date. The default value is the current date
  dateadded: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    validate: [
      // Function takes in the new `description` value to be saved as an argument
      function(input) {
        // If this returns true, proceed. If not, return the error message below
        return input.length >= 6;
      },
      // Error Message
      "Description should be longer."
    ]
  }
});

// This creates our model from the above schema, using mongoose's model method
const Book = mongoose.model("Book", GoogleBookSchema);

// Export the Example model
module.exports = Example;
