const mangoose = require("mongoose");
const School = new mangoose.Schema(
  {
    _id: mangoose.Schema.Types.ObjectId,
    name: {
      type: String,
    },
    registrationNumber: {
      type: String,
      unique: true,
    },  
    affiliated: {
      type: String,
    },
    medium: {
      type: Array,
    },
    type: {
      type: String,
    },
    area: {
      type: String,
    },
    street: {
      type: String,
    },
    landmark: {
      type: String,
    },
    pincode: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    telephoneNumber: {
      type: Array,
    },
    email: {
      type: String,
    },
    // primary,sec,sr sec ,tertiary
    educationTypes: {
      type: Array,
    },
    shift: {
      type: Array // {shiftName: string, startTime: string, endTime: string}
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mangoose.model("School", School);
