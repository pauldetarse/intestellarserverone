//https://www.youtube.com/watch?v=5nL7X1UMWsc
//https://www.youtube.com/watch?v=Y6KrUwmlrNE

//Restful get post request
$(function(){
	var $name = $('#name');
	var $drink = $('#drink');
	var $orders = $('#orders');
	
	var orderTemplate = $('#order-template').html();
	
	
	function addOrder(order){
	 $orders.append(Mustache.render(oderTemplate, order));
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
	$orders.delegate('.remove','click', function(){
		var $li = $(this).closet('li');
		$.ajax({
		type: 'DELETE',
		url: '/api/orders/' + $(this).attr('data-id'),
		success: function(){
			$li.fadeOut(300, function(){
				$(this).remove();
			});
		}
		})
	});
	//edit order
	$orders.delegate('.editOrder','click', function(){
		var $li = $(this).closet('li');
		$li.find('input.name').val($li.find('span.name').html());
		$li.find('input.drink').val($li.find('span.drink').html());
		$li.addClass('edit');
	});
	//cancel edit 
	$orders.delegate('.cancelEdit','click', function(){
		$(this).closet('li').removeClass('edit');		
	});
	//cancel edit 
	$orders.delegate('.saveEdit','click', function(){
		var order= function
		
	});
});