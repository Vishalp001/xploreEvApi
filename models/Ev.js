const mongoose = require('mongoose')

const EvSchema = new mongoose.Schema(
  {
    evName: {
      type: String,
      required: true,
      unique: true,
    },
    evtype: {
      type: String,
      required: true,
    },
    upcoming: {
      type: String,
      required: true,
    },
    evPrice: {
      type: String,
      required: true,
    },
    imgOne: {
      type: String,
      required: false,
    },
    imgTwo: {
      type: String,
      required: false,
    },
    imgThree: {
      type: String,
      required: false,
    },
    imgFour: {
      type: String,
      required: false,
    },
    imgFive: {
      type: String,
      required: false,
    },

    brand: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    chargingTime: {
      type: String,
      required: false,
    },
    range: {
      type: String,
      required: false,
    },
    topSpeed: {
      type: String,
      required: false,
    },
    torque: {
      type: String,
      required: false,
    },
    motorPower: {
      type: String,
      required: false,
    },
    motorType: {
      type: String,
      required: false,
    },
    transmissionTypes: {
      type: String,
      required: false,
    },
    features: {
      type: String,
      required: false,
    },
    safetyFeatures: {
      type: String,
      required: false,
    },
    dimensions: {
      type: String,
      required: false,
    },
    alloyWheelSize: {
      type: String,
      required: false,
    },
    kerbWeight: {
      type: String,
      required: false,
    },
    groundClearance: {
      type: String,
      required: false,
    },
    batteryCapacity: {
      type: String,
      required: false,
    },
    batteryType: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ElectricVehicle', EvSchema)
