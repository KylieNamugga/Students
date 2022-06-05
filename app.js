const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const connectDb = require('./config/database')

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator');

// importing the database
const config = require('./config/database');

//calling the sign off route
const signoffRoutes = require('./routes/signoffRoutes');


// instaciating the app to use express
const app = express()


// middleware

// established connection
connectDb();
const port = process.env.NODE_LOCAL_PORT || 3000
// mongoose.connect(config.database);
// const db = mongoose.connection;

// if ok console log message
// connectDb.once('open',()=>{
//     console.log('connected to mongodb')
// });
// // telling the console if theres an error
// connectDb.on('error',(err)=>{
//     console.log(ErrorEvent)
// });


// must be used during pug 
// setting an engine sice we using pug
app.engine('pug', require('pug').__express); 
app.set('view engine','pug');
app.set('views', path.join(__dirname,'views'));


// extended means when node uses body parser get the forms the way they are and focus on input fields
app.use(express.urlencoded({extended:true}));
// telling to use json formate when exposing the fields
app.use(express.json());
//telling bodyparser to use json formate when exposing the fields
app.use(bodyParser.json());


// find all my static files in public these include css images etc
app.use(express.static(path.join(__dirname,"public")));


// app.use
app.use('/',signoffRoutes);



//the message that appears in case someone searches for a route that doesnt exist on my server
app.get('*', (req, res) => {
    res.status(404).send('no such page')
});
  


app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
});
