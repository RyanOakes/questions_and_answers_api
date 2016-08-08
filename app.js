'use strict';

var express = require("express");
var app = express();

//linking up middleware
app.use(function(req, res, next) {
  console.log("The leaves on the trees are", req.query.color);
  next();
});

// app.use(function(req, res, next) {
//   console.log(req.myMessage);
//   next();
// });

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Express server listening on port", port)
});
