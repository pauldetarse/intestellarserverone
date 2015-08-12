
var express = require('express');
var router = express.Router();

var database = require('../database/database.js');
	database.connect();




console.log('youtube');




router.get('/youtube', function(req, res, next) {
	console.log('/api/youtube');
 
	var url=database.findYoutubeUrl();
	res.json(url);
});


router.post('/youtube', function(req, res, next) {
	console.log(req.query);
	console.log('/api/youtube');
	database.saveYoutubeUrl({url:req.query.url,username:req.query.url});
	console.log('after database');
	
	
  
	
	res.json(req.query);
});
router.delete('/youtube:id',function(req, res, next){
	console.log('id ',req.params.id);
	orders.splice(parseInt(req.params.id),1);
	console.log(JSON.stringify(orders));
	res.json(orders);
});

router.put('/youtube:id',function(req, res, next){
	console.log('put');
	orders.splice(parseInt(req.params.id),1,{'id':req.params.id,'name':req.params.name,'drink':req.params.drink});
	console.log(JSON.stringify(orders));
	res.json(orders);
	

});

module.exports = router;
