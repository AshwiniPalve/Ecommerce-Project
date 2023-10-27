const express = require('express')
const utils = require('../utils')
const pool = require('../db')
// router will be used to add routes in  routerlication 
const router = express.Router()


router.get('/cart', (req, res) => {
    //cartId,productId,productTitle,quantity,price
    const statement = `select c.id as cartId,
    user,
    p.id as productId,
    p.title as ProductTitle,
    c.quantity as quantity,
    c.price as price 
    from cart c inner join product p on c.product = p.id
     where user = ${req.id}`
    pool.execute(statement, (error, data) => {
        res.send(utils.createdResult(error, data))
    })
    // res.send('list of cart')
})

router.post('/cart', (req, res) => {
    const { product, quantity, price } = req.body
    const statement = `insert into cart(user,product,quantity,price)values('${req.id}','${product}','${quantity}','${price}' )`
    pool.execute(statement, (error, data) => {
        //console.log('cart created')
        res.send(utils.createdResult(error, data))
    })

})

router.put('/cart/:id', (req, res) => {
    const { id } = req.params
    const {product, quantity, price } = req.body
    const statement = `update cart set 
    user=${req.id} ,
    product='${product}',
    quantity='${quantity}',
    price='${price}'
    where id=${id}`
    pool.execute(statement, (error, data) => {
       // console.log('cart updated')
        res.send(utils.createdResult(error, data))
    })

})

router.patch('/cart/:id', (req, res) => {
    const { id } = req.params
    const { quantity } = req.body
    const statement = `update cart set 
    quantity='${quantity}'
    where id=${id} `
    pool.execute(statement, (error, data) => {
        console.log('cart updated')
        res.send(utils.createdResult(error, data))
    })

})


router.delete('/cart/:id', (req, res) => {
    const { id } = req.params
    const statement = `delete from cart where id=${id}`;
    pool.execute(statement, (error, data) => {
        res.send(utils.createdResult(error, data))
    })
    //res.send('cart deleted')
})



//exporting an router having all routes related categories
module.exports = router