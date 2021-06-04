const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({
	    customer_id:{ type: mongoose.Schema.Types.ObjectId, ref : 'Contact',required: true}, // belongsTo m:1
		order_id : {
			 type : Number,
			 required : true
		}
});

const Order = module.exports = mongoose.model('Order',OrderSchema);