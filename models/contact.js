const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	     firstname :  {
			  type : String,
			  required : true
		 },
		 lastname : {
			  type :String,
			  required : true
		 },
		 ordersInContact: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // hasMany 1:m
});

const Contact =  module.exports =  mongoose.model('Contact',ContactSchema);