const express = require('express')
const utils=require('../utils')
const pool= require('../db')
// router will be used to add routes in  application 
const router=express.Router()




router.get('/products',(req,res)=>{
    const statement = ` select id,title,description from product`
    pool.execute(statement, (error, data) => {
         // console.log('list of Products')
        res.send(utils.createdResult(error,data))
    })
  
})

router.post('/products',(req,res)=>{
    const { title, description,price,category,company } = req.body
    const statement = `insert into product (title,description,price,category,company)values('${title}','${description}','${price}','${category}','${company}')`
    pool.execute(statement, (error, data) => {
       console.log('Product created')
        res.send(utils.createdResult(error,data))
    })
    
})

router.put('/products/:id',(req,res)=>{
    const { id } = req.params
    const { title, description,price,category,company } = req.body
    const statement = `update product set title='${title}' ,
    description='${description}',
    price='${price}',
    category='${category}',
    company='${company}'
    where id=${id} `
    pool.execute(statement, (error, data) => {
      console.log(' product updated')
        res.send(utils.createdResult(error,data))

    })
   
})

router.delete('/products/:id',(req,res)=>{
    const { id } = req.params
    const statement = `delete from product where id=${id}`;
    pool.execute(statement, (error, data) => {
         console.log( 'deleted Product')
        res.send(utils.createdResult(error,data))
    })
  
})

//exporting an router having all routes related categories
module.exports=router