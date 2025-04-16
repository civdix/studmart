const { Schema, model } = require("mongoose");

const StudentSchema = new Schema({
  name: {
    type: String,
    defualt: "Anonymouse",
  },
  collegeEmail: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  college: {
    type: String,
  },
  rollNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  joined: {
    type: Date,
    default: Date.now,
  },

  profilePicture: String,
  listings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  savedListings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

const Student = model("students", StudentSchema);
Student.createIndexes();
module.exports = Student;
