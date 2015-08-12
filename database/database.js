/*
 Gears:          Located with nodejs-0.10
    Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
    Database Name:  stellarserverone
    Password:       f9iGyanWL-If
    Username:       admin

*/

var mongoose = require('mongoose');
var database={
 
connect:function(){
	console.log('connect');
	
	
	// default to a 'localhost' configuration:
var  connectionString='mongodb://localhost/stellarserverone';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){/*
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
  */
  connectionString="mongodb://"+process.env.OPENSHIFT_MONGODB_DB_USERNAME+":"+
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD+"@"+ 
  process.env.OPENSHIFT_MONGODB_DB_HOST+':'+
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
  
}

	
	
	//mongoose.connect('mongodb://username:password@host:port/database?options...');
	mongoose.connect(connectionString, function(err) {
  		if (err) { throw err; }
	});
 

		var users = new mongoose.Schema({
  		name:String,
  		password : String,
  		date : { type : Date, default : Date.now }
		});
 

	this.Users = mongoose.model('users', users);
	
	var youtube= new mongoose.Schema({
		username:String,
		url:String,
		date : { type : Date, default : Date.now }
	}); 
	this.Youtube = mongoose.model('youtube', youtube);
	console.log('youtune');
	console.log(this.Youtube);

},
	
save:function(user){
	console.log('save');

	var users = new this.Users({name:user.name,password:user.password});
	
 

	users.save(function (err) {
  	if (err) { throw err; }
  	console.log('Commentaire ajouté avec succès !');
  
	});
},
saveYoutubeUrl:function(youtube){
	console.log('saveYoutube');
	console.log(JSON.stringify(youtube));

	var youtube = new this.Youtube({url:youtube.url,username:youtube.username});
	console.log('youtube');
	console.log(this.Youtube);
	
 

	youtube.save(function (err) {
  	if (err) { throw err; }
  	console.log('Url saved');
  
	});
	console.log('saveYoutube');
},
findYoutubeUrl:function(){
	console.log('save');

	this.Youtube.find('null',function(err,youtube) {
			console.log('find');
  			if (err) { throw err; }
			console.log(JSON.stringify(users));
  
  			console.log(youtube);
			return youtube;
	})
},
	
	
find:function(){
	console.log('fund')
	this.UserModel.find(null, function (err, users) {
		console.log('find');
  	if (err) { throw err; }
		console.log(JSON.stringify(users));
  
  	console.log(users);
	return users;
	 
   
	});	
},
close:function(){
	mongoose.connection.close();


}
	
}
module.exports=database;