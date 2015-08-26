var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var championSchema = new Schema({
  champId: Number,
  kills: Number,
  deaths: Number,
  assists: Number,
  totalCrowdControl: Number,
  totalDamage: Number,
  winRate: Number,
  region: String,
  ranked: Boolean,
  timeline: {
      "csDiffPerMinDeltas": {
          "thirtyToEnd": Number,
          "twentyToThirty": Number,
          "zeroToTen": Number,
          "tenToTwenty": Number,
      },
      "goldPerMinDeltas": {
          "thirtyToEnd": Number,
          "twentyToThirty": Number,
          "zeroToTen": Number,
          "tenToTwenty": Number,
      },
      "xpDiffPerMinDeltas": {
          "thirtyToEnd": Number,
          "twentyToThirty": Number,
          "zeroToTen": Number,
          "tenToTwenty": Number,
      },
      "creepsPerMinDeltas": {
          "thirtyToEnd": Number,
          "twentyToThirty": Number,
          "zeroToTen": Number,
          "tenToTwenty": Number,
      },
      "xpPerMinDeltas": {
          "thirtyToEnd": Number,
          "twentyToThirty": Number,
          "zeroToTen": Number,
          "tenToTwenty": Number,
      },
      "damageTakenDiffPerMinDeltas": {
          "thirtyToEnd": Number,
          "twentyToThirty": Number,
          "zeroToTen": Number,
          "tenToTwenty": Number,
      },
      "damageTakenPerMinDeltas": {
          "thirtyToEnd": Number,
          "twentyToThirty": Number,
          "zeroToTen": Number,
          "tenToTwenty": Number,
      }
})
