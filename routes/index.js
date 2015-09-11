var express = require('express');
var router = express.Router();
var path=require('path');
console.log('routes/index.js');
//var database = require('../database/database.js');
//database.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
	console.log('root');
	res.sendFile(path.join(__dirname,'../ajax-1.html'));
});

router.get('/tuna', function(req, res, next) {
  //res.render('index', { title: 'Express' });
	console.log('tuna');
	res.sendFile(path.join(__dirname,'../tuna/tuna-28.html'));
});




router.get('/webrtc',function(req,res,next){

	res.sendFile(path.join(__dirname,'../index.html'));

})

router.get('/ajax', function(req, res, next) {
  //res.render('index', { title: 'Express' });
		console.log('ajax');
	res.sendFile(path.join(__dirname,'../ajax-2.html'));
});
router.get('/polymer', function(req, res, next) {
  //res.render('index', { title: 'Express' });
		console.log('polymer');
	res.sendFile(path.join(__dirname,'../polymer/index.html'));
});

router.get('/stellar', function(req, res, next) {
  //res.render('index', { title: 'Express' });
		console.log('stellar');
	res.sendFile(path.join(__dirname,'../polymerstellar/index.html'));
});
router.get('/webrtc',function(req, res, next){
	console.log('webrtc');
	res.sendFile(path.join(__dirname,'../webrtc/webrtc.html'));

});
router.get('/datachannel',function(req, res, next){
	console.log('webrtc');
	res.sendFile(path.join(__dirname,'../webrtc/datachannel.html'));

});

router.get('/hermes',function(req, res, next){
	console.log('hermes');
	res.sendFile(path.join(__dirname,'../hermes/index.html'));

});



module.exports = router;
