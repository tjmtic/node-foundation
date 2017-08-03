var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/product-page.html'));
});



module.exports = router;
