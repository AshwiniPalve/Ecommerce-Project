const express = require('express')
//import bodyparser
const bodyParser = require('body-parser')
const jwt=require ('jsonwebtoken')
const config =require('./config')
const crypto=require('crypto-js')
const db = require('./db')
const cors = require('cors')

//routers
const routerCategories=require('./Routes/category')
const routerCompanies=require('./Routes/company')
const routerProducts=require('./Routes/product')
const routerCarts=require('./Routes/cart')
const routerUser=require('./Routes/user')

//create express app
const app = express()
//middleware
//passing json parser
const jsonParser = bodyParser.json()
app.use(jsonParser)
//to make html data into json format
app.use(bodyParser.urlencoded())

//enable frotend application to make api calls 
app.use(cors('*'))
app.use((req,res,next)=>{
//skip the checking token for the following API's
//signin and signup
//console.log(`url : ${req.url}`)  output: url : /user/profile/

if((req.url=='/user/signin')
||(req.url=='/user/signup')
||(req.url.startsWith('/user/verify'))
||(req.url.startsWith('/user/toggle-status'))){
    //skip the checking token
    next()
}
else{
//get the token sent by client
const token = req.headers['token']
console.log("token:",token)
try{
    //verify if the token is valid
    const data = jwt.verify(token, config.secret)
    console.log("data",data)
    //if token is valid ,grab the user id  
    //add the userId in the req object so that it can be used in all API's
    req.id= data['id']

    //call the next handler
    next()

}catch(ex){
    res.send({
        status:'error',
        error:'Unauthorized access'
    
 })
}
}
})

 app.use(routerUser)
 app.use(routerCategories)
 app.use(routerCompanies)
 app.use(routerProducts)
 app.use(routerCarts)
 

 app.get('/',(req,res)=>{
    res.send('Welcome to  Ecommerce application Application')
 })



app.listen(4000,'localhost',()=>{
    console.log('server running successfully at the port 4000')
})