var express = require('express');
var router = express.Router();

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */
router.get('/',(req,res)=>{
  res.send('通了，呵呵')
})
module.exports = router;
