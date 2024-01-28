const { log } = require('console');
const express=require('express');
const dotenv=require('dotenv');//useful in collaborating environment when sharing source code but not credentials
const morgan=require('morgan');
const bodyparser=require('body-parser');
const path=require('path');
const connectDB=require('./server/database/connection');

const app=express();

dotenv.config({path:'config.env'});//path to the env file

const PORT=process.env.PORT||8080;

//log requests
app.use(morgan('tiny'));
//mongodb connection
connectDB();

//parse request to bodyparser
app.use(bodyparser.urlencoded({extended:true}));//input from html forms
//set view engine
app.set('view engine','ejs');//all ejs are in views so no need to define path
//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')));//resolve merges & makes absolute path
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));//now we can directly use /img without mentioning root directories
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));
//load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT,()=>{
    console.log(`server running at:${PORT}`);
})