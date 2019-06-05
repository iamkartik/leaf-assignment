var express = require('express');
var router = express.Router();

const apiController = require('../controllers/apiController');

router.post('/api/v1/type=:value?',apiController.doWork);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
