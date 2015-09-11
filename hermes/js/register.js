$.register('click',function(){
	$.ajax({
	type: 'GET',
	url: 'user/authenticator',
	success: function(data){
		console.log('registered'+data)
	},
	error: function(){
	alert('error loading orders');
	}	
  	});
})
