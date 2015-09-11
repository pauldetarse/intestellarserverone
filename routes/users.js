var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile('ajax-1.html');
});

router.post('/authenticator', function(req, res, next) {
  //res.render('index', { title: 'Express' });
	console.log(req.body);
	username=req.body.username;
	password=req.body.password;
	//database.saveUser()
	res.json({success:'true'})
});


module.exports = router;
