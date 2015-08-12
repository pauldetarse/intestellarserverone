//https://www.youtube.com/watch?v=5nL7X1UMWsc
$(function(){
	var $name = $('#name');
	var $drink = $('#drink');
	var $orders = $('#orders');
	
	function addOrder(order){
	 $orders.append('<li>name:' +order.name +', drink:'+ order.drink + '</li>');
	}
	
	$.ajax({
	type: 'GET',
	url: 'api/orders',
	success: function(orders){
	 $.each(data, function(i,order){
	  addOrder(order);
	 });
	},
	error: function(){
	alert('error loading orders');
	}	
  });
	$('#add-order').on('click',function(0{
	 var order={
		name: $name.val(),
		drink: $drink.val(),
	 },
	 $.ajax({
	 type: 'POST',
	 url: '/api/orders',
	 data: order,
	 success: function(newOrder){
		 $orders.append('<li>name:' +newOrder.name +', drink:'+ newOrder.drink + '</li>');
	 },
	 error: function(){
	  alert('error saving order');
	 }
	 })
	});
});