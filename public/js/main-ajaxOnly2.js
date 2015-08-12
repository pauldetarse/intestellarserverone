//https://www.youtube.com/watch?v=5nL7X1UMWsc
//https://www.youtube.com/watch?v=Y6KrUwmlrNE

//Restful get post request
$(function(){
	var $name = $('#name');
	var $drink = $('#drink');
	var $orders = $('#orders');
	
	var orderTemplate = $('#order-template').html();
	console.log('orderTemplate ',orderTemplate);
	
	
	function addOrder(order){
	 $orders.append(Mustache.render(orderTemplate, order));
	}
	$('#list-order').on('click',function(){
		get();
		
	
	
	})
	function get(){
		  $orders.empty();
	$.ajax({
	type: 'GET',
	url: 'http://rest.learncode.academy/api/cindy/orders',
	success: function(orders){
		console.log(JSON.stringify(orders));
	 $.each(orders, function(i,order){
		 console.log(i);
		 console.log(JSON.stringify(order));
		
	  addOrder(order);
	 });
	},
	error: function(){
	alert('error loading orders');
	}	
  });
	}
	$('#add-order').on('click',function(){
	 var order={
		name: $name.val(),
		drink: $drink.val(),
	 };
	 $.ajax({
	 type: 'POST',
	 url: 'http://rest.learncode.academy/api/cindy/orders',
	 data: order,
	 success: function(newOrder){
		 addOrder(newOrder)
		// $orders.append('<li>name:' +newOrder.name +', drink:'+ newOrder.drink + '</li>');
	 },
	 error: function(){
	  alert('error saving order');
	 }
	 });
	});
	
	$orders.delegate('.remove','click', function(){
		var $li = $(this).closest('li');
		$.ajax({
		type: 'DELETE',
		url:  'http://rest.learncode.academy/api/cindy/orders' + $(this).attr('data-id'),
		success: function(){
			$li.fadeOut(300, function(){
				$(this).remove();
			});
		}
		})
	});
	
	
	
	//edit order
	$orders.delegate('.editOrder','click', function(){
		var $li = $(this).closest('li');
		$li.find('input.name').val($li.find('span.name').html());
		$li.find('input.drink').val($li.find('span.drink').html());
		$li.addClass('edit');
	});
	//cancel edit 
	$orders.delegate('.cancelEdit','click', function(){
		$(this).closest('li').removeClass('edit');		
	});
	//cancel edit 
	$orders.delegate('.saveEdit','click', function(){
		console.log('edit');
		var data={'name':$('.name'),'drink':$('.drink'),}
	//	var order= function
		$.ajax({
		type:'put',
		url:'http://rest.learncode.academy/api/cindy/orders'+$(this).attr('data-id'),
		success:function(){
			alert('updated')
			
		
		},
		error:function(){
			console.log('error updating');
		
		}
		
		})
		
	});
});