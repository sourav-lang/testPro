const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const Order = require('../models/order');
const uuid = require('node-uuid');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var config = require('../config');
var async = require('async');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: 'souravsarkarpapai@gmail.com',
    pass: 'Tito12345@'
  }
});

/* https://www.google.com/settings/security/lesssecureapps    Must do ON for allow from this url*/

//transporter.use('compile', hbs({viewPath: '../email_templates', extName: '.hbs'}));

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: 'email_templates',
    layoutsDir: 'email_templates',
    defaultLayout: '',
  },
  viewPath: 'email_templates',
  extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions));

/*
router.get('/contacts_or_and', (req,res,next) => {
	  Contact.find({$and: [{ $or: [ { firstname: { $eq : "Adi" } }, { firstname : { $eq: "Ratna" } } ] },{ lastname: { $eq: "Mandal" } }]}).exec(function(err,result) { 
					 if(err) throw err;
					 res.json(result);
	});	
});*/

router.get('/contacts_range', (req,res,next) => {
	   Order.aggregate([{ $group : { _id: null, range: { $range : [1222,6000] }}}]).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	   });
});

router.get('/contacts_notin', (req,res,next) => {
	  Contact.find({ firstname: { $nin: ['Sourav', 'Anil'] } } ).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

router.get('/contacts_like5', (req,res,next) => {
	  Contact.find({'firstname': {$regex : 'sou'}}).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});


//db.users.find({name: /a/})  //like '%a%'
// db.users.find({name: /^pa/}) //like 'pa%' 
// db.users.find({name: /ro$/}) //like '%ro'

router.get('/contacts_like4', (req,res,next) => {
	  Contact.find({firstname : /^sou/}).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

router.get('/contacts_like3', (req,res,next) => {
	  Contact.find({firstname : /di$/}).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

router.get('/contacts_like2', (req,res,next) => {
	  Contact.find({firstname : /.*S.*/}).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

//same as above
router.get('/contacts_like', (req,res,next) => {
	  Contact.find({firstname : /S/}).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

router.get('/contacts_sum', (req,res,next) => {
	 Order.aggregate([{ $group : { _id: null, rrr: { $sum : "$order_id" }}}]).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});
});

router.get('/contacts_avg', (req,res,next) => {
	 Order.aggregate([{ $group : { _id: null, rrr: { $avg : "$order_id" }}}]).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});
});

router.get('/contacts_count', (req,res,next) => {
	  Contact.count({ firstname: { $in: ['Sourav', 'Anil'] } } ).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

router.get('/contacts_top_3_descorder', (req,res,next) => {
	
	 Contact.find()
	 .sort({_id : -1})
	 .limit(3)
	 .exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
	
});

router.get('/contacts_top_3_ascorder', (req,res,next) => {
	
	 Contact.find()
	 .sort({_id : 1})
	 .limit(3)
	 .exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
	
});

router.get('/contacts_match', (req,res,next) => {
	
	Contact.aggregate([ { $match : { firstname : "Ratna" } } ]).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});
	
});

router.get('/contacts_in', (req,res,next) => {
	
	   AAA((response) => {
		   res.json(response);
	   });
	  
});


function AAA (cb) {
	Contact.find({ firstname: { $in: ['Rio'/* 'Sourav', 'Anil' */] } } ).exec(function(err,result) { 
	     if(err) { cb(err); };
		 //console.log("ooo",result);
		 cb(result);
	});	
}



router.get('/contacts_or', (req,res,next) => {
	  Contact.find({ $or: [ { firstname: { $eq: "Adi" } }, { lastname: { $eq: "Mandal" } } ] }).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

router.get('/contacts_and4', (req,res,next) => {
	  Order.find({ $and: [ { order_id: { $gte: 1000 } }, { order_id: { $lt: 2000 } } ] }).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
}); 

router.get('/contacts_and3', (req,res,next) => {
	  Order.find({ $and: [ { order_id: { $gt: 1000 } }, { order_id: { $lt: 2000 } } ] }).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
}); 

router.get('/contacts_and2', (req,res,next) => {
	  Contact.find({ $and: [ { firstname: { $eq: "Sourav" } }, { lastname: { $ne: "Sarkar" } } ] }).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
}); 

// same as above
router.get('/contacts_and22', (req,res,next) => {
	  Contact.find({ $and: [ { firstname: "Sourav" }, { lastname:"Sarkar"} ] }).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

router.get('/contacts_and', (req,res,next) => {
	  Contact.find({ $and: [ { firstname: { $eq: "Sourav" } }, { lastname: { $eq: "Sarkar" } } ] }).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});	
});

router.get('/contacts_distinct', (req,res,next) => {
	  const query = {"lastname": "Mandal"}; // where statement
	  Contact.distinct("firstname",query,function(error, result) {
		       res.json(result);
	  });	
});



router.get('/contacts', (req,res,next) => {
	  Contact.find(function(error, result) {
		       res.json(result);
	  });	
});



router.get('/contacts_show', (req,res,next) => {
	  
	  /*Contact.find(function(err, result) {
		    if(err) {  res.json(err); }
			res.json(result);
	  });*/
	  // hasMany 1:m
	  Contact.find()
	        .populate('ordersInContact')
			.sort({_id : 1})
			.exec((err,result) => {
				if(err) throw err;
				res.json(result);
			});
});


router.post('/addcontact', (req,res,next) => {
	     
     var AddContact = new Contact({
		  firstname : req.body.firstname,
          lastname : req.body.lastname	  
	 });
	 
	 AddContact.save((err,result)=> {
             if(err) { res.json({msg : 'Failed to add data.'}); } 
			 else { res.json({msg : 'Data added.'}); }	 
	 });

       
		 
});


router.delete('/deletecontact/:id', (req,res,next) => {
       	 Contact.remove({_id : req.params.id}, (err, result) => {
			   if(err) {  res.json(err); }
			   else {  res.json(result); }
		 });
});


router.put('/updatecontact', (req,res,next) => {
	
	   const updateContact = { $set : { firstname : req.body.firstname, lastname : req.body.lastname} };
       	 Contact.updateMany({_id : req.body.contact_id},updateContact, (err, result) => {
			   if(err) {  res.json(err); }
			   else {  res.json(result); }
		 });
});


router.post('/addorder', (req,res,next) => {
	     
     var AddOrder = new Order({
		  customer_id : req.body.customer_id,
          order_id : req.body.order_id  
	 });
	 
	 AddOrder.save((err,result)=> {
             if(err) { res.json({msg : 'Failed to add data.'}); } 
			 else {
                 
				 const updateContact = { $set : { ordersInContact : result._id} };
				 Contact.updateOne({_id : req.body.customer_id},updateContact, (err, result) => {
					   if(err) {  res.json(err); }
					   else {  res.json({order : "Order Added."}); }
				 });
			     
			 }	 
	 });
	 
		 
});

router.get('/orders', (req,res,next) => {
	  
	/*   Order.find(function(err, result) {
		    if(err) {  res.json(err); }
			res.json(result);
	  }); */
	  
	  
    Order.aggregate([
    { $lookup:
       {
         from: 'contacts',   // must use mongo shell collection name instead of model name
         localField: 'customer_id',
         foreignField: '_id',
         as: 'orddls'
       }
     }
    ]).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});
	
	
		  
	  
});


router.get('/get_orders', function(req,res,next) {
	
	// belongsTo m:1
	   Order.find()
	        .populate('customer_id')
			.sort({_id : -1})
			.exec((err,result) => {
				if(err) throw err;
				res.json(result);
			});
});


router.get('/get_order_max_value', function(req,res,next) {
	  Order.aggregate([{ $group : { _id: null, max: { $max : "$order_id" }}}]).exec(function(err,result) { 
	     if(err) throw err;
		 res.json(result);
	});
});


router.post('/image_upload', function(req,res,next) {
	
	  var media = req.files.upload;
       var ext = media.name.slice(media.name.lastIndexOf('.'));
       var fileName = uuid.v4() + ext;
	   var imagePath = 'public/uploads/customer/'+fileName;
       media.mv(imagePath,function(err,result) {
              if(err) throw err;
			  res.json({message:'Image uploaded successfully.'});
       });
});

router.post('/email',function(req,res) {
	
	 var base_url = config.__site_url;
	 
	
	 
	 transporter.sendMail({

                        from: '"Sankalpa"',
                        to: 'souravsarkar35@gmail.com',
                        subject: 'Test Email',
                        template: 'forgot_password',
                        context: {
                            name: 'Adriyan',
                            base_url: base_url
                        }

                    }, function (err, response) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(response);
							
							       transporter.sendMail({

											from: '"Sankalpa"',
											to: 'souravsarkar35@gmail.com',
											subject: 'Sourav Email',
											template: 'test',
											context: {
												name: 'Sourav',
												base_url: base_url
											}

										}, function (err, response) {
											if (err) {
												console.log(err);
											} else {
												console.log(response);
											}
										}); 
							
                        }
                    }); 

        /*
           Simple mail transfer
		   
		transporter.sendMail({
				from: 'test@aa.in',
				to: 'souravsarkar35@gmail.com',
				subject: 'hello',
				html: 'hello world!'
			}, function (err, response) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(response);
                        }
                    }); */

					
});


router.post("/contact_addshow",function(req,res) {

var myObj = {};
	     		 
 function A() {
	   return new Promise(function(resolve,reject) { 
			
			  var AddContact = new Contact({
				  firstname : req.body.firstname,
				  lastname : req.body.lastname 			  
			   });
 
			  AddContact.save(function(err, data) {
					  if(err) {  reject(err); }
					  resolve(data);
			  });	
	   }); 
 }
 
 function B() {
	 
	 return new Promise(function(resolve,reject) {
		   
			 Order.find({_id : '5d8ce85cbbe3461780142548'},function(err,data){
				  if(err) {   reject(err); }
				  resolve(data);
			  })					   
						
	 });
	 
 }
 
 function C() {
	 
	 return new Promise(function(resolve,reject) {
		   resolve('Hello World');	
	 });
	 
 }
 
	       /*  A().then((data1)=> {
		         myObj['data1'] = data1;
				 return B();
			}).then((data2)=> {
				 myObj['data2'] = data2;
				 return C();
			}).then((data3)=> {
				 myObj['data3'] = data3;
				 res.send(myObj['data1']+'///////'+myObj['data2']+'/////////'+myObj['data3']);
			}).catch((err)=> { 
				 res.send('Error'+err); 
	        }); */
			
			
		/* Another Way using promise all */
		
		/* var a = A();
		var b = a.then((data)=> {  return B();  });
		var c = b.then((data)=> {  return C();  });
		
		Promise.all([a, b, c]).then(function([resultA, resultB, resultC]) {
               res.send(resultA+'/////////////'+resultB+'/////////'+resultC); 
        }).catch((err)=> { 
		     res.send('Error1'+err); 
		}); */
		
		
		/* Another Way using async await */
		
		 /*  async function main() {
			 try {
			 myObj['data1'] = await A();
			 myObj['data2'] = await B();
			 myObj['data3'] = await C();
			 res.send(myObj['data1']+'///////'+myObj['data2']+'/////////'+myObj['data3']);
			 } catch(e) {
				 res.send('Error'+e);
			 }
		}
		
        main(); */
		
		
		/* Another Best Way using async await */
		
		/* async function main() {
			 try {
			 myObj['data'] = await Promise.all([A(), B(), C()]);
			 res.send(myObj['data'][0]+'///////'+myObj['data'][1]+'//////'+myObj['data'][2]);
			 } catch(e) {
				 res.send('Error'+e);
			 }
		}
		
        main(); */
		
		
		
		
});


router.post("/async_waterfall",function(req,res) {
	
	
	var obj = {};
	
	async.waterfall([
	
	    function A(callback) {
			 Order.find({_id : '5d8cec6143fad3175cf61e54'},function(err,data){
				  if(err) {   callback(err, null); }
				  callback(null, data);
			  });	  
		},
		function B(abc, callback) {
			
			  Order.find({_id : '5d8ce85cbbe3461780142548'},function(err,data){
				  if(err) {   callback(err, null); }
				  callback(null, abc, data);
			  });
		},
		function C(abc, xyz, callback) {
			
			  Order.find({_id : '5d8cec5a43fad3175cf61e53'},function(err,data){
				  if(err) {   callback(err, null); }
				  obj['data1'] = abc;
				  obj['data2'] = xyz;
				  obj['data3'] = data;
				  callback(null, obj);
			  });
		}
	
	],function(err, result) {
		
		if(err) { console.error(err); return; }
		
		console.log(result);
	}); 
	
	/* var obj = {};
	
	async.waterfall([
	
	    function A(callback) {
			 Order.find({_id : '5d8cec6143fad3175cf61e54'},function(err,data){
				  if(err) {   callback(err, null); }
				  obj['data1'] = data;
				  callback(null);
			  });	  
		},
		function B(callback) {
			
			  Order.find({_id : '5d8ce85cbbe3461780142548'},function(err,data){
				  if(err) {   callback(err, null); }
				  obj['data2'] = data;
				  callback(null, obj);
			  });
		}
	
	],function(err, result) {
		
		if(err) { console.error(err); return; }
		
		console.log(result);
	});  */
	
	
	/* async.series([
	
	    function A(callback) {
			  callback(null,'A result');
		},
		function B(callback) {
			  callback(null,'B result');
		},
		function C(callback) {
			  callback(null,'C result');
		}
	
	],function(err, result) {
		
		if(err) { console.error(err); return; }
		
		console.log(result);
	}); */
	
});




module.exports = router;
