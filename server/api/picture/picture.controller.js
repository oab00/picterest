'use strict';

var _ = require('lodash');
var Picture = require('./picture.model');

// Get list of pictures
exports.index = function(req, res) {
  Picture.find(function (err, pictures) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(pictures);
  });
};

// Get a single picture
exports.show = function(req, res) {
  Picture.findById(req.params.id, function (err, picture) {
    if(err) { return handleError(res, err); }
    if(!picture) { return res.status(404).send('Not Found'); }
    return res.json(picture);
  });
};

// Creates a new picture in the DB.
exports.create = function(req, res) {
  Picture.create(req.body, function(err, picture) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(picture);
  });
};

// Updates an existing picture in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Picture.findById(req.params.id, function (err, picture) {
    if (err) { return handleError(res, err); }
    if(!picture) { return res.status(404).send('Not Found'); }
    var updated = _.merge(picture, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(picture);
    });
  });
};

// Deletes a picture from the DB.
exports.destroy = function(req, res) {
  Picture.findById(req.params.id, function (err, picture) {
    if(err) { return handleError(res, err); }
    if(!picture) { return res.status(404).send('Not Found'); }
    picture.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}