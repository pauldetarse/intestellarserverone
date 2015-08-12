var express = require('express');
var router = express.Router();
console.log('orders');
var orders=[{'name':'Cindy','drink':'Coffey','id':id}];
var id=0;

/* GET users listing. */
router.get('/orders', function(req, res, next) {
	console.log('/api/orders');
 // res.json([{'name':'Cindy','drink':'Coffey','id':id}]);
	res.json(orders);
});


router.post('/orders', function(req, res, next) {
	console.log('/api/orders');
	console.log(req.body);
	
  orders.push({'name':req.body.name,'drink':req.body.drink,'id':id});
	id++;
	res.json(req.body);
});
router.delete('/orders/:id',function(req, res, next){
	console.log('id ',req.params.id);
	orders.splice(parseInt(req.params.id),1);
	console.log(JSON.stringify(orders));
	res.json(orders);
});

router.put('/orders/:id',function(req, res, next){
	console.log('put');
	orders.splice(parseInt(req.params.id),1,{'id':req.params.id,'name':req.params.name,'drink':req.params.drink});
	console.log(JSON.stringify(orders));
	res.json(orders);
	

});

module.exports = router;
