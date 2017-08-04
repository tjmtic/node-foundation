var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET home page. */
router.get('/pluton/pluton', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../public/templates/pluton/index.html'));
});



module.exports = router;
