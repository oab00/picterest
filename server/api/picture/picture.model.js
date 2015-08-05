'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PictureSchema = new Schema({
  user: Object,
  url: String
});

module.exports = mongoose.model('Picture', PictureSchema);