var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var fileUpload = require('express-fileupload');
var app = express();
const port = 3000;
const route = require('./routes/route');


mongoose.connect('mongodb://localhost:27017/tem', { useNewUrlParser: true , useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
	    console.log('Database connected to mongodb @ 27017');
});


mongoose.connection.on('error', (err) => {
	  console.log("Database connection error : "+err);
});

app.use(cors());

app.use(fileUpload());

//app.use(bodyParser.json({limit: '50mb', extended: true}))
//app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route);


app.get('/',(req,res) => {
	res.send('This is home page');
});



app.listen(port,() => {
	 console.log("Server run on port number :"+port);
});

