const mongoose = require('mongoose')

const ElectricBikeSchema = new mongoose.Schema(
  {
    eBikeName: {
      type: String,
      required: true,
      unique: true,
    },
    eBikePrice: {
      type: String,
      required: true,
    },
    brand: {
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
    topSpeed: {
      type: String,
      required: false,
    },
    range: {
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
    chargingTime: {
      type: String,
      required: false,
    },
    batteryType: {
      type: String,
      required: false,
    },
    batteryCapacity: {
      type: String,
      required: false,
    },

    features: {
      type: String,
      required: false,
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
    username: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ElectricBike', ElectricBikeSchema)
