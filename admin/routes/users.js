var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/aa', function(req, res, next) {
  res.send('加油');
});

module.exports = router;
