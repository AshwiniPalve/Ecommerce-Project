const express = require('express')
const utils = require('../utils')
const mysql = require('mysql2/promise')
const moment=require('moment')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    port: 3306,
    database: 'ecommerce1', 
    waitforConnection: true,
    connectionLimit: 10,
    queueLimit: 0,

})
// router will be used to add routes in  routerlication 
const router = express.Router()

router.get('/order', (req, res) => {
    const statement = ` select * from order`
    pool.execute(statement, (error, data) => {
        const result = utils.createdResult(error, data)
        res.send(result)
    })
    //  res.send('list of order')
})

router.post('/order', (req, res) => {
    //closure
    (async () => {
        //step 1: get all products from cart
        const statementCart =
            ` select c.id as cartId,
                p.id as productId,
                p.price as price,
                c.quantity as quantity
                from cart c
                inner join product p on c.product=p.id
                where user=${req.id}`

        const [items] = await pool.execute(statementCart)
        let total = 0
        for (const item of items) {
            total += item['quantity'] * item['price']
        }

    //step 2: add those product into order 
    const date=moment().format('DD/MM/YYYY')
   
    const statementOrder=
    `insert into userOrder(user,totalPrice,orderDate,paidAmount,orderStatus)
    values
    (${req.id},${total},'${date.toString()}',${total},0)`
    
    //place an order
    const [order]=await pool.execute(statementOrder)
 
    // get the orderId for orderDetails
     const orderId = order['insertId']

     for (const item of items){
        const statementOrderDetails = 
        `insert into orderDetails
        (orderId,product,price,quantity)
        values
        (${orderId},${item['productId']},${item['price']},${item['quantity']})`

        await pool.execute(statementOrderDetails)
     }
   

     //step 3: delete all the items from cart
     const statementCartDeleteItems=`delete from cart where user=${req.id}`
     await pool.execute(statementCartDeleteItems)
    
    res.send({status:'success'})  
}) 
()
})


router.put('/order/:id', (req, res) => {

})


router.patch('/order/:id', (req, res) => {

})

router.delete('/order/:id', (req, res) => {
    const { id } = req.params
    const statement = `delete from order where id='${id}'`
    pool.execute(statement, (error, data) => {
        // console.log(' company deleted')
        res.send(utils.createdResult(error, data))
    })

})




//exporting an router having all routes related categories
module.exports = router